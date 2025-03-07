"use client";
import Link from 'next/link';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";
import logo from '@/assets/Logo.png'
import alertNew from '@/assets/alertNEW.png'

import { useInterval, useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

const VideoCapture: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [timer,setTimer] = useState({
        minutes: 4,
        seconds: 59
    });

    // const Timer = ()=>{
        useInterval(()=>{
            if(recording){
                let seconds = timer.seconds;
            let minutes = timer.minutes;
            if(timer.seconds == 0){
                minutes = timer.minutes - 1;
                seconds = 60;
            }
            if(minutes <= 0 && seconds <= 0){
                // stopRecording();
                setTimer({minutes:0, seconds:59});
            }
            seconds --;
            setTimer({
                minutes,seconds
            });
            } else {
                
                setTimer({minutes:4, seconds:59});
            }

            if(timer.minutes == 0 && timer.seconds == 0){
                setTimer({minutes:4, seconds:59});
                stopRecording();
            }
            
            
             
        },1000)
    // }

    const {angle,type} = useOrientation(); 
    const router = useRouter(); 
    useEffect(()=>{
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        if(portrait){
              router.push(`./rotate/video_capture`);
          }
      },[angle]);

          const [reachedBottom, setReachedBottom] = useState(false);
        
        
          useEffect(() => {
            const handleScroll = () => {
              const offsetHeight = document.documentElement.offsetHeight;
              const innerHeight = window.innerHeight;
              const scrollTop = document.documentElement.scrollTop;
          
              const hasReachedBottom = 2*offsetHeight - (innerHeight + scrollTop) <= 10;
              if(hasReachedBottom){
        
                setReachedBottom(hasReachedBottom);
              }
              
            };
          
            window.addEventListener("scroll", handleScroll);
          
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);

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
        // Timer();
        
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
        reader.onloadend = () => {
            const base64data = reader.result as string;
            try {
                const car_no = localStorage.getItem('car_no');
                window.localStorage.setItem(`videoData_${car_no}`, base64data);
                addVideo(base64data)
                console.log("Video saved to localStorage!");
                setTimeout(()=>{

                    router.push(`./vehicle_video`);
                },300)
            
            } catch (error) {
                console.error("Error saving video to localStorage:", error);
            }
        };
        reader.readAsDataURL(blob);
    }, [recordedChunks]);

    return (
        <div className='bg-[#282828] w-full   text-white pt-6 text-[20px] relative h-[200vh]'>
        


    <div className="fixed top-0">
      <div className="relative">
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
                               
                              }}
                            
                        >
                            Save this Video
                        </button>
                    </div>
                </div>
            )}
      {/* <img className="h-full w-[14%] absolute z-10" src={blurBG.src}/> */}

                {/* <button className='bg-white absolute rounded-full w-[75px] h-[75px] z-20 top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>{capture(); console.log('yes')}}></button> */}
                {!recording ?  

                <button
                className='bg-white rounded-full  border border-secondary absolute z-20 w-[75px] h-[75px] top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer'
                onClick={recording ? stopRecording : startRecording}
                >
                    <div className=' bg-red-600 rounded-full w-5 h-5'></div>
                </button>
                :
                <button
                className='bg-white rounded-full border border-secondary absolute z-20 w-[75px] h-[75px] top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer'
                onClick={recording ? stopRecording : startRecording}
                >
                    <div className='bg-black w-5 h-5'></div>
                </button>
                }
                
                <Link href={`./vehicle_video`} className="absolute z-20 left-[4.5vw] text-[22px] font-500 top-[30px] text-white">
                    Exit
                </Link>
                <Link href="./advice_vehicle_video">
                <img className=" absolute z-20 object-cover w-[40px] left-[4.5vw] bottom-[5vh]" src={alertNew.src}/>
                </Link>
                <div className='absolute z-20 right-[16vw] bottom-[4vw] bg-[#695DFD] rounded-3xl px-3 py-[4px] text-[14px]'>
                    {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}`: timer.seconds}
                </div>
                
      <div className="h-full w-[14%] bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className="h-full w-[14%] right-0 bg-[#000000] absolute z-10 opacity-85 backdrop-blur-2xl ">
            
      </div>
      <div className=" w-[100vw] h-[100vh] overflow-hidden relative">
        


        <div className="-z-10 w-[100vw] h-[100vh]  overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted  className=' w-full object-cover'></video>

        </div>
        
    </div>
    </div>
    </div>
    <div className={`bg-[#282828] absolute top-0 ${reachedBottom ? 'hidden' : 'flex'} justify-center w-full h-[100vh] `} >
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
