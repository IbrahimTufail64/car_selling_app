"use client"; // Mark as a Client Component
import { useRef, useState } from "react";

const BlurDetection = () => {
  // const [focusScore, setFocusScore] = useState<number | null>(null);
  // const imageInputRef = useRef<HTMLInputElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // // Function to calculate the variance of an array
  // const variance = (array: number[]) => {
  //   const mean = array.reduce((acc, x) => acc + x, 0) / array.length;
  //   return array.reduce((acc, el) => acc + Math.pow(el - mean, 2), 0) / array.length;
  // };

  // // Function to apply a Laplacian filter
  // const applyLaplacian = (imageData: ImageData) => {
  //   const data = imageData.data;
  //   const width = imageData.width;
  //   const height = imageData.height;
  //   const laplacianKernel = [0, 1, 0, 1, -4, 1, 0, 1, 0]; // 3x3 Laplacian kernel
  //   const output = new Float32Array(width * height);

  //   for (let y = 1; y < height - 1; y++) {
  //     for (let x = 1; x < width - 1; x++) {
  //       let sum = 0;
  //       for (let ky = -1; ky <= 1; ky++) {
  //         for (let kx = -1; kx <= 1; kx++) {
  //           const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
  //           const kernelIndex = (ky + 1) * 3 + (kx + 1);
  //           sum += data[pixelIndex] * laplacianKernel[kernelIndex]; // Use grayscale value (R channel)
  //         }
  //       }
  //       output[y * width + x] = sum;
  //     }
  //   }

  //   return output;
  // };

  // Function to process the image
  // const processImage = (image: HTMLImageElement) => {
  //   if (!canvasRef.current) return;

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) return;

  //   // Draw the image on the canvas
  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  //   // Get the image data
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //   // Apply the Laplacian filter
  //   const laplacianOutput = applyLaplacian(imageData);

  //   // Calculate the variance of the Laplacian output
  //   const varianceValue = variance(Array.from(laplacianOutput));

  //   // Normalize the score by dividing by the total number of pixels
  //   const normalizedScore = varianceValue / (canvas.width * canvas.height);

  //   // Scale the score to ensure visibly blurred images score below 50
  //   const scaledScore = normalizedScore * 1000; // Adjust the scaling factor as needed

  //   setFocusScore(scaledScore);
  // };

  // Handle image upload
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const image = new Image();
  //     image.src = e.target?.result as string;
  //     image.onload = () => {
  //       processImage(image);
  //     };
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">Blur Detection</h1>
    //   <input
    //     type="file"
    //     ref={imageInputRef}
    //     accept="image/*"
    //     onChange={handleImageUpload}
    //     className="mb-4"
    //   />
    //   <canvas ref={canvasRef} className="hidden" />
    //   {focusScore !== null && (
    //     <p className="text-lg">
    //       Focus Score: <span className="font-bold">{focusScore.toFixed(2)}</span>
    //       <br />
    //       {focusScore < 50 ? "The image is blurry." : "The image is sharp."}
    //     </p>
    //   )}
    // </div>
    null
  );
};

export default BlurDetection;