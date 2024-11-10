"use client"
import React, { useEffect } from 'react'
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";

const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const router = useRouter();

    const handleStartCaptureClick = React.useCallback(() => {
        if (!webcamRef.current || !webcamRef.current.stream) {
            alert("Webcam is not ready.");
            return;
        }
      
        alert('Video recording started! Click again to end recording.');
        setCapturing(true);

        // Start the media recorder only if the stream is available
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });

        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.onstop = handleStopCaptureClick;
        
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data && data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(async () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setCapturing(false);
        }
        handleDownload()
    }, [mediaRecorderRef]);

    async function addVideo(video) {
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

    const handleDownload = React.useCallback(() => {
        // if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            console.log(blob);
            

            const url = URL.createObjectURL(blob);
            addVideo(url);
            const a = document.createElement("a");
            a.href = url;
            a.download = "video_capture.webm";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        // }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 1400,
        height: 600,
        facingMode: "environment"
    };

    useEffect(() => {
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        if (portrait) {
            router.push(`./rotate/video_capture`);
        }
    }, []);

    return (
        <div className='bg-[#282828] h-[100vh] overflow-hidden flex '>
            <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
                <Link href='#'>Exit</Link>
                <Link href='#'>
                    <img src={Alert.src} className='w-10' />
                </Link>
            </div>
            <div className='flex justify-center items-center h-full relative'>
                <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} />
            </div>
            <div className='w-[10vw]'>
                <div className='flex w-[10vw] justify-center items-center h-full relative'>
                    <button 
                        className='bg-[#1E201D] rounded-full border border-1 border-secondary w-[60px] h-[60px] cursor-pointer' 
                        onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default WebcamStreamCapture;
