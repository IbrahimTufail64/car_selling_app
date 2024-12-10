"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";
import logo from '@/assets/Logo.png'

import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recorder, setRecorder] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const initializeCamera = async () => {
      if (typeof window !== "undefined" && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
        }
      } else {
        console.error("Camera API is not available.");
      }
    };

    initializeCamera();
  }, []);

  const startRecording = async () => {
    if (!videoRef.current?.srcObject) {
      console.error("No video stream found.");
      return;
    }

    const stream = videoRef.current.srcObject as MediaStream;

    const { default: RecordRTC } = await import("recordrtc"); // Lazy import RecordRTC
    const newRecorder = new RecordRTC(stream, { type: "video" });
    newRecorder.startRecording();
    setRecorder(newRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        setRecordedBlob(recorder.getBlob());
        console.log(recorder.getBlob());
      });
      setRecorder(null);
      setIsRecording(false);
      setShowPopup(true);
    }
  };


  // const downloadRecording = () => {
  //   if (recordedBlob) {
  //     const url = URL.createObjectURL(recordedBlob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "recorded-video.mp4";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   }
  // };

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

  const saveRecording = async() => {

    if (recordedBlob) {
      const reader = new FileReader();
      reader.onload = async() => {
        const base64Data = reader.result as string; // Convert Blob to Base64
        try {
          const car_no = Number(localStorage.getItem('car_no'));
           window.localStorage.setItem(`videoData_${car_no}`, base64Data);
           console.log(base64Data);
          // localStorage.setItem("recordedVideo", base64Data);
          await addVideo(base64Data)
          console.log("Video saved to localStorage.");
        } catch (e) {
          console.error("Error saving video to localStorage:", e);
        }
      };
      reader.onerror = () => {
        console.error("Error reading the blob as Base64.");
      };
      reader.readAsDataURL(recordedBlob); // Read Blob as Base64
    } else {
      console.error("No recorded video available to save.");
    }
  };

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
                {!isRecording ? 
                // <button
                // className='bg-[#1E201D] rounded-full border border-secondary w-[60px] h-[60px] cursor-pointer'
                // onClick={recording ? stopRecording : startRecording}
                // >

                // </button>
                <button
                className='bg-white rounded-full border border-secondary w-[60px] h-[60px] flex justify-center items-center cursor-pointer'
                onClick={isRecording ? stopRecording : startRecording}
                >
                    <div className=' bg-red-600 rounded-full w-5 h-5'></div>
                </button>
                :
                <button
                className='bg-white rounded-full border border-secondary w-[60px] h-[60px] flex justify-center items-center cursor-pointer'
                onClick={isRecording ? stopRecording : startRecording}
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
                            className='bg-blue-500 text-white rounded-full px-5 py-2 cursor-pointer'
                            onClick={()=>{

                              saveRecording();
                               setShowPopup(false); 
                               router.push(`./vehicle_video`);}}
                            
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

export default App;





