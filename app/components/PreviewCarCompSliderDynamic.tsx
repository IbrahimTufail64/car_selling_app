import React, { useEffect, useState } from 'react';
import { db } from '../Local_DB/db';

const PreviewCarCompSliderDynamic = ({
  toRetrieve,
  setcurrentcar,
  current,
}: {
  current: undefined;
  toRetrieve: string;
  setcurrentcar: React.Dispatch<React.SetStateAction<undefined>>;
}) => {
  const [_img, set_img] = useState<any[]>([]);

  useEffect(() => {
    const car_number = localStorage.getItem('car_no');
    const retrieve = async (image_to_retrieve: string, setter_function: React.Dispatch<any[]>) => {
      try {
        const images = await db.images
          .where('name')
          .equals(image_to_retrieve)
          .filter((image) => image.car_number === car_number)
          .toArray();
        setter_function(images); // Store the array of images
      } catch (e) {
        console.error(e);
      }
    };
    retrieve(toRetrieve, set_img);
  }, [toRetrieve]);

  return (
    <>
      {_img?.map((e) => (
        <div key={e.data} className="relative embla__slide">
          <img
            onClick={() => setcurrentcar(e.data)}
            src={e.data}
            className="w-[80px] h-[80px] object-cover rounded-lg"
            alt="Dynamic Slide"
          />
          <div
            className={`bg-[#675DF4] opacity-40 max-w-[80px] max-h-[80px] w-full h-full rounded-lg absolute top-0 ${
              !(e.data === current) && 'hidden'
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};

export default PreviewCarCompSliderDynamic;
