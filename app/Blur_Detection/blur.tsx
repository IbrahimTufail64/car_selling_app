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
      alert(sharpnessValue);
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

  // Step 1: Adaptive Downsampling (Prevents high-res overload)
  const MAX_PIXELS = 2_000_000; // Process max 2MP for speed
  const downscale = Math.sqrt((image.width * image.height) / MAX_PIXELS);
  const width = Math.floor(image.width / Math.max(1, downscale));
  const height = Math.floor(image.height / Math.max(1, downscale));

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  // Step 2: Edge Detection (Laplacian + Noise Thresholding)
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const stride = 4;
  let edgeStrengthSum = 0;
  let strongEdgeCount = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * stride;
      
      // Convert to grayscale
      const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      const grayUp = 0.299 * data[i - width*stride] + 0.587 * data[i+1 - width*stride] + 0.114 * data[i+2 - width*stride];
      const grayDown = 0.299 * data[i + width*stride] + 0.587 * data[i+1 + width*stride] + 0.114 * data[i+2 + width*stride];
      const grayLeft = 0.299 * data[i - stride] + 0.587 * data[i+1 - stride] + 0.114 * data[i+2 - stride];
      const grayRight = 0.299 * data[i + stride] + 0.587 * data[i+1 + stride] + 0.114 * data[i+2 + stride];

      // Laplacian edge strength
      const edgeStrength = Math.abs(4 * gray - grayUp - grayDown - grayLeft - grayRight);

      // Only count edges stronger than noise (threshold adaptive to resolution)
      const noiseThreshold = width > 2000 ? 10 : 20; // Higher threshold for high-res
      if (edgeStrength > noiseThreshold) {
        edgeStrengthSum += edgeStrength;
        strongEdgeCount++;
      }
    }
  }

  // Step 3: Normalized Sharpness Score
  if (strongEdgeCount < 50) return 0; // Not enough edges (likely blurry)
  const avgEdgeStrength = edgeStrengthSum / strongEdgeCount;
  const normalizedSharpness = avgEdgeStrength * (strongEdgeCount / (width * height));

  return normalizedSharpness;
};

  return (
null
  );
};

export default ImageSharpnessChecker;