"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import Alert from '@/assets/icons/Alert_white.png';
import { db } from "@/app/Local_DB/db";
import logo from '@/assets/Logo.png'
import alertNew from '@/assets/alertNEW.png'
import { useOrientation, useTimeout } from 'react-use';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import Timer from "../components/Timer";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recorder, setRecorder] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showStartPopup, setShowStartPopup] = useState<boolean>(false);
  const router = useRouter();

            const [reachedBottom, setReachedBottom] = useState(false);
            const [timer,setTimer] = useState({
              minutes: 4,
              seconds: 59
          });
      
          // const Timer = ()=>{
              // setInterval(()=>{
              //   if(isRecording){
              //     let seconds = timer.seconds;
              // let minutes = timer.minutes;
              // if(timer.seconds == 0){
              //     minutes = timer.minutes - 1;
              //     seconds = 60;
              // }
              // if(minutes <= 0 && seconds <= 0){
              //     // stopRecording();
              //     setTimer({minutes:0, seconds:59});
              // }
              // seconds --;
              // setTimer({
              //     minutes,seconds
              // });
              // } else {
                  
              //   setTimer({minutes:4, seconds:59});
              // }
  
              // if(timer.minutes == 0 && timer.seconds == 0){
              //     setTimer({minutes:4, seconds:59});
              //     // setTimer({minutes:0, seconds:5});
              //     console.log(timer.minutes,timer.seconds)
              //     stopRecording();
              // }
                  
                  
                   
              // },1000)
          // }
          
          
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
    setShowStartPopup(true);
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

  useEffect(()=>{
    // localStorage.clear(); 
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    if(portrait){
          router.push(`../rotate/video_capture_ios`);
      }
  },[])
  
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
          const car_no = localStorage.getItem('car_no');
          await addVideo(base64Data)
          console.log(base64Data);
          // alert(base64Data);
          //  window.localStorage.setItem(`videoData_${car_no}`, base64Data);
          // localStorage.setItem("recordedVideo", base64Data);
          console.log("Video saved to localStorage.");
          router.push(`./vehicle_video`);
          
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
        


    <div className="fixed top-0">
      <div className="relative">
      {showPopup && (
                <div className='fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-4 '>Recording stopped successfully!</p>
                        <button
                            className='bg-gray-200 rounded-full px-5 py-2 mr-2'
                            onClick={() => {setShowPopup(false); } }
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

{showStartPopup && (
                <div className='fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-4 '>Recording started!</p>
                        <button
                            className='bg-gray-200 rounded-full px-5 py-2 mr-2'
                            onClick={() => {setShowStartPopup(false); } }
                        >
                            Close
                        </button>
                    </div>
                   
                </div>
                
            )}
      {/* <img className="h-full w-[14%] absolute z-10" src={blurBG.src}/> */}

                {/* <button className='bg-white absolute rounded-full w-[75px] h-[75px] z-20 top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>{capture(); console.log('yes')}}></button> */}
                {!isRecording ? 

                <button
                className='bg-white rounded-full  border border-secondary absolute z-20 w-[75px] h-[75px] top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer'
                onClick={isRecording ? stopRecording : startRecording}
                >
                    <div className=' bg-red-600 rounded-full w-5 h-5'></div>
                </button>
                :
                <button
                className='bg-white rounded-full border border-secondary absolute z-20 w-[75px] h-[75px] top-[50%] -right-5 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer'
                onClick={isRecording ? stopRecording : startRecording}
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
                    {/* {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}`: timer.seconds} */}
                    <Timer isRecording={isRecording} stopRecording={stopRecording} />
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
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                <IoChevronBack className='rotate-90 text-[#675DF4]' size={75}/>
                </div>
            </div>
            </div>
        </div>
        
    </div>

  );
};

export default App;





