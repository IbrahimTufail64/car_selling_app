"use client";
import Link from 'next/link';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";
import logo from '@/assets/Logo.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

const VideoCapture: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const {angle,type} = useOrientation(); 
    const router = useRouter(); 
    useEffect(()=>{
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        if(portrait){
              router.push(`./rotate/video_capture`);
          }
      },[angle])

    useEffect(() => {
        
        const setupStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' } // Switch to back camera
                });
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

        let options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/mp4' };
        }

        mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);

        mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
                setRecordedChunks((prev) => [...prev, event.data]);
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
        // alert('Recording started')
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
        reader.onloadend = async() => {
            const base64data = reader.result as string;
            console.log(base64data);
            try {
                const car_no = Number(localStorage.getItem('car_no'));
                alert(base64data);
                // window.localStorage.setItem(`videoData_${car_no}`, base64data);
                await addVideo(base64data)
                console.log("Video saved to localStorage!");
                router.push(`./vehicle_video`);
            } catch (error) {
                console.error("Error saving video to localStorage:", error);
            }
        };
        reader.readAsDataURL(blob);
    }, [recordedChunks]);

    return (
        <div className='bg-[#282828] w-full   text-white pt-6 text-[20px] relative h-[200vh]'>
<div className='bg-[#282828] flex h-[100vh] overflow-hidden px-5 fixed'>
            <div className='w-[10vw] flex flex-col justify-between pb-16 py-10 font-[300] text-white'>
                <Link href='./vehicle_video'>Exit</Link>
                <Link href='./advice_vehicle_video'>
                    <img src={Alert.src} className='w-5 h-5 md:w-10 md:h-10 object-cover ' />
                </Link>
            </div>
            <div className='flex justify-center items-center h-full  relative w-full'>
                <div>
                <video ref={videoRef} autoPlay playsInline muted  className='h-[100vh] w-[80vw] mb-10'></video>
                <div className='h-10'></div>
                </div>
                {/* <div>jfaljdsfi</div> */}
            </div>
            <div className='w-[10vw] flex justify-center items-center ml-5 mb-5'>
                {!recording ? 
                // <button
                // className='bg-[#1E201D] rounded-full border border-secondary w-[60px] h-[60px] cursor-pointer'
                // onClick={recording ? stopRecording : startRecording}
                // >

                // </button>
                <button
                className='bg-white rounded-full border border-secondary w-[60px] h-[60px] flex justify-center items-center cursor-pointer'
                onClick={recording ? stopRecording : startRecording}
                >
                    <div className=' bg-red-600 rounded-full w-5 h-5'></div>
                </button>
                :
                <button
                className='bg-white rounded-full border border-secondary w-[60px] h-[60px] flex justify-center items-center cursor-pointer'
                onClick={recording ? stopRecording : startRecording}
                >
                    <div className='bg-black w-5 h-5'></div>
                </button>
                }
            </div>

            {/* Popup */}
            {showPopup && (
                <div className='fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-4 '>Recording stopped successfully!</p>
                        <button
                            className='bg-gray-200 rounded-full px-5 py-2 mr-2'
                            onClick={() => setShowPopup(false) }
                        >
                            Close
                        </button>
                        <button
                            className='bg-blue-500 text-white rounded-full px-5 py-2'
                            onClick={()=>{saveRecording(); setShowPopup(false); }}
                            disabled={recording || recordedChunks.length === 0}
                        >
                            Save this Video
                        </button>
                    </div>
                </div>
            )}
        </div>
        <div className='bg-[#282828] absolute top-0 flex justify-center w-full h-[100vh]'>
            <div>
            <div className=' '>
            <img src={logo.src} className=''/>
            </div>

            <div className='pt-5 '>
                ... And scroll down
            </div>
            <div className='flex justify-center w-full pt-5 '>
                <div className='space-y-[-20px]'>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='-rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            </div>
        </div>
        
    </div>
    );
};

export default VideoCapture;



