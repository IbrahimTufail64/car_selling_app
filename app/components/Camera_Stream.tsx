"use client"
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1400,
    height: 900,
    facingMode: "FACING_MODE_ENVIRONMENT"
  };
  
  const WebcamCapture = ({webcamRef}:{webcamRef:any}) => {

    


    return (
        <Webcam
                mirrored={false}
            audio={false}
            height={900}
            screenshotFormat='image/webp'
            width={1400}
            ref={webcamRef}
            videoConstraints={videoConstraints}
        >
        </Webcam>
    )
  };

  export default WebcamCapture
