"use client"
import { useEffect, useState } from 'react';

const ImageSharpnessChecker = ({imageURL,set_is_blured}:{imageURL:string | null,set_is_blured:  React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [sharpness, setSharpness] = useState<number | null>(null);


  useEffect(() => {
    if (!imageURL) return;

    const image = new Image();
    image.src = imageURL;

    // Wait for the image to load before calculating sharpness
    image.onload = () => {
      const sharpnessValue = calculateSharpness(image);
      setSharpness(sharpnessValue);
      console.log('Sharpness:', sharpnessValue);
      set_is_blured(sharpnessValue < 30);
    };

    // Handle image loading errors
    image.onerror = () => {
      console.error('Failed to load image');
    };
  }, [imageURL, set_is_blured]);

const calculateSharpness = (image: HTMLImageElement): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');

  // Webcam-specific settings (no downsampling for 720p)
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const stride = 4;
  let laplacianSum = 0;
  let edgeCount = 0; // Count strong edges to normalize better

  // Webcams often have noise - we focus only on strong edges
  for (let y = 1; y < canvas.height - 1; y++) {
    for (let x = 1; x < canvas.width - 1; x++) {
      const i = (y * canvas.width + x) * stride;
      
      // Grayscale conversion
      const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      const grayUp = 0.299 * data[i - canvas.width*stride] + 
                    0.587 * data[i+1 - canvas.width*stride] + 
                    0.114 * data[i+2 - canvas.width*stride];
      const grayDown = 0.299 * data[i + canvas.width*stride] + 
                       0.587 * data[i+1 + canvas.width*stride] + 
                       0.114 * data[i+2 + canvas.width*stride];
      const grayLeft = 0.299 * data[i - stride] + 
                       0.587 * data[i+1 - stride] + 
                       0.114 * data[i+2 - stride];
      const grayRight = 0.299 * data[i + stride] + 
                        0.587 * data[i+1 + stride] + 
                        0.114 * data[i+2 + stride];
      
      // Laplacian edge strength
      const edgeStrength = Math.abs(4 * gray - grayUp - grayDown - grayLeft - grayRight);
      
      // Only count edges above noise threshold
      if (edgeStrength > 25) { // Adjusted for webcam noise
        laplacianSum += edgeStrength;
        edgeCount++;
      }
    }
  }

  // Normalize by strong edges only (not total pixels)
  return edgeCount > 100 ? (laplacianSum / edgeCount) : 0;
};

  return (
null
  );
};

export default ImageSharpnessChecker;