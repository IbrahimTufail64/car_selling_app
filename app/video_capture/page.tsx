"use client";
import Link from 'next/link';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";

const VideoCapture: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const setupStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };
        setupStream();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const startRecording = useCallback(() => {
        if (!streamRef.current) return;
        
        setRecordedChunks([]);
        setShowPopup(false); // Hide popup if it was open

        mediaRecorderRef.current = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });

        mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
                setRecordedChunks((prev) => [...prev, event.data]);
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setRecording(false);
        setShowPopup(true); // Show popup when recording stops
    }, []);

    async function addVideo(video:any) {
        try {
            const existingVideo = await db.images.where('name').equals('video').first();
            if (existingVideo) {
                await db.images.update(existingVideo.id, { data: video });
            } else {
                await db.images.add({ name: 'video', data: video });
            }
        } catch (error) {
            console.error("Error adding video to database:", error);
        }
    }


    const saveRecording = useCallback(() => {
        if (recordedChunks.length === 0) return;

        const blob = new Blob(recordedChunks, { type: 'video/webm' });

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            try {
                window.localStorage.setItem('videoData', base64data);
                addVideo(base64data)
                console.log("Video saved to localStorage!");
            } catch (error) {
                console.error("Error saving video to localStorage:", error);
            }
        };
        reader.readAsDataURL(blob);
    }, [recordedChunks]);

    return (
        <div className='bg-[#282828] flex h-[100vh] overflow-hidden px-5'>
            <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
                <Link href='#'>Exit</Link>
                <Link href='#'>
                    <img src={Alert.src} className='w-10' />
                </Link>
            </div>
            <div className='flex justify-center items-center h-full relative w-full'>
                <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '600px' }}></video>
            </div>
            <div className='w-[10vw] flex justify-center items-center'>
                <button
                    className='bg-[#1E201D] rounded-full border border-secondary w-[60px] h-[60px] cursor-pointer'
                    onClick={recording ? stopRecording : startRecording}
                ></button>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-4'>Recording stopped successfully!</p>
                        <button
                            className='bg-gray-200 rounded-full px-5 py-2 mr-2'
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                        <button
                            className='bg-blue-500 text-white rounded-full px-5 py-2'
                            onClick={()=>{saveRecording(); setShowPopup(false)}}
                            disabled={recording || recordedChunks.length === 0}
                        >
                            Save this Video
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoCapture;
