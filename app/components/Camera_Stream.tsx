"use client";

import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "environment",
};

const WebcamCapture = ({ webcamRef }: { webcamRef: any }) => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Webcam
        mirrored={false}
        audio={false}
        screenshotFormat="image/webp"
        ref={webcamRef}
        videoConstraints={videoConstraints}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default WebcamCapture;
