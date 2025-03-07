"use client"
import { useEffect, useState } from 'react';

const ImageSharpnessCheckerFC = () => {
  // const [sharpness, setSharpness] = useState<number | null>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>(null);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const image = new Image();
  //       image.src = e.target?.result as string;
  //       image.onload = () => {
  //         setImageUrl(image.src);
  //         const sharpnessValue = calculateSharpness(image);
  //         setSharpness(sharpnessValue);
  //       };
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // useEffect(()=>{
  //   const image = new Image();
  //       image.src = imageURL as string;
  //   const sharpnessValue = calculateSharpness(image);
  //   setSharpness(sharpnessValue);
  // },[])
  // const calculateSharpness = (image: HTMLImageElement): number => {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');

  //   if (!context) {
  //     throw new Error('Could not get canvas context');
  //   }

  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   context.drawImage(image, 0, 0, image.width, image.height);

  //   const imageData = context.getImageData(0, 0, image.width, image.height);
  //   const data = imageData.data;

  //   // Calculate the average pixel value
  //   let sum = 0;
  //   for (let i = 0; i < data.length; i += 4) {
  //     const r = data[i];
  //     const g = data[i + 1];
  //     const b = data[i + 2];
  //     const gray = 0.299 * r + 0.587 * g + 0.114 * b; // Convert to grayscale
  //     sum += gray;
  //   }
  //   const mean = sum / (data.length / 4);

  //   // Calculate the variance of pixel values
  //   let variance = 0;
  //   for (let i = 0; i < data.length; i += 4) {
  //     const r = data[i];
  //     const g = data[i + 1];
  //     const b = data[i + 2];
  //     const gray = 0.299 * r + 0.587 * g + 0.114 * b;
  //     variance += Math.pow(gray - mean, 2);
  //   }
  //   variance /= data.length / 4;

  //   return variance;
  // };

  return (
    <div>
      <h1>Image Sharpness Checker</h1>
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
      {/* {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageU} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )} */}
      {/* {sharpness !== null && (
        <div>
          <h2>Sharpness Score</h2>
          <p>{sharpness.toFixed(2)}</p>
          <p>
            {sharpness > 2300
              ? 'The image is relatively sharp.'
              : 'The image is relatively blurry.'}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default ImageSharpnessCheckerFC;