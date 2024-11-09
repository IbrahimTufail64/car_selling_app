"use client"
import React, { useEffect } from 'react'
import Webcam from 'react-webcam';
import { useOrientation } from 'react-use';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/assets/icons/Alert_white.png'
import { db } from "@/app/Local_DB/db";

const WebcamStreamCapture = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const router = useRouter();
    const handleStartCaptureClick = React.useCallback(() => {
      alert('video recording started! Click again to end recording');
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      alert('video recording done!');
      mediaRecorderRef.current.stop();
      setCapturing(false);
      console.log('video working')
      handleDownload();
      router.push(`./vehicle_video`); 
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    
    async function addVideo(video) {
      try {
        
    const image = await db.images.where('name').equals('video').first();
        if(image?.data !== undefined ){
          const id = await db.images.where('name').equals('video').modify({
            name: 'video',
            data: video
          })
          console.log(id)
        }else{
          const id = await db.images.add({
            name: 'video',
            data: video
          });
          console.log(id)
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    const handleDownload = React.useCallback(() => {
      console.log(recordedChunks)
      // if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        console.log(blob)
        addVideo(blob);
        // const reader = new FileReader();
        // console.log(localStorage.getItem("videoData"));
        // reader.onloadend = function() {
        //     // Get base64 string from the result
        //     const base64data = reader.result;
            
        //     // Store the base64 string in localStorage
        //     localStorage.setItem("videoData", base64data);
        //     console.log("Video saved to localStorage!");
        // };

        // // Start reading the Blob as a data URL
        // reader.readAsDataURL(blob);

        // Download option
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // document.body.appendChild(a);
        // a.style = "display: none";
        // a.href = url;
        // a.download = "react-webcam-stream-capture.webm";
        // a.click();
        // window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
        
        
      // }
    }, [recordedChunks]);

    const videoConstraints = {
      width:  1400,
      height:  600,
      facingMode: "environment"
    };
  



      const {angle,type} = useOrientation(); 
  
      useEffect(()=>{
        const portrait = window.matchMedia("(orientation: portrait)").matches;
        if(portrait){
              router.push(`./rotate/video_capture`); 
          }
      },[angle])

    return (
      <div className='bg-[#282828] h-[100vh] overflow-hidden flex '>
        
      <div className='w-[10vw] flex flex-col justify-between px-7 py-10 font-[300] text-white'>
          <Link href='#' >
              Exit 
          </Link>
          <Link href='#'>
              <img src={Alert.src} className='w-10 '/> 
          </Link>
      </div>
      <div className='flex justify-center items-center h-full relative'>
      
      <>
      <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints}/>
      
    </>
      </div>
      <div className='w-[10vw]'>
          <div className='flex w-[10vw] justify-center  items-center h-full relative'>
              <button className='bg-[#1E201D] rounded-full border border-1 border-secondary w-[60px] h-[60px] cursor-pointer' onClick={capturing ? handleStopCaptureClick : handleStartCaptureClick }></button>
          </div>
      </div>
  </div>
    );
  };
  
export default WebcamStreamCapture;



 
  