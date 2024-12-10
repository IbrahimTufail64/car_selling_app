"use client";

import { useEffect, useRef, useState } from "react";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recorder, setRecorder] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

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
      });
      setRecorder(null);
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded-video.mp4";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h1>Camera and Video Recording</h1>
      <video ref={videoRef} width="640" height="480" muted autoPlay />
      <div style={{ marginTop: "20px" }}>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
        {recordedBlob && <button onClick={downloadRecording}>Download Video</button>}
      </div>
    </div>
  );
};

export default App;
