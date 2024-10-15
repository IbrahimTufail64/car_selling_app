"use client"
import React, { useRef, useEffect, useState } from 'react';

function MyComponent() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleClick = (event:any) => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;

    // Get canvas position relative to the viewport
    const canvasRect = canvas.getBoundingClientRect();
    const relativeX = canvasRect.left;
    const relativeY = canvasRect.top;

    // Calculate mouse position relative to canvas
    const clientX = event.clientX;
    const clientY = event.clientY;
    const x = clientX - relativeX;
    const y = clientY - relativeY;

    setCoordinates({ x, y });


    console.log(`Clicked at: X - ${x}, Y - ${y}`);
  };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick); // Use 'click' event

      return () => canvas.removeEventListener('click', handleClick);
    }
  }, [canvasRef]); // Dependency on canvasRef

  return (
    <div className="relative w-full">
      <div
        className="indicator bg-secondary w-5 h-5 absolute rounded-full" // Style indicator
        style={{ top: coordinates.y-10, left: coordinates.x-10 }}
      ></div>
      <canvas ref={canvasRef} width="400" height="300" className="bg-fourth mt-[100px]" onClick={handleClick} />
    </div>
  );
}

export default MyComponent;