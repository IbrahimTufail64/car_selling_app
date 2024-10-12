"use client"

import HomePage from "./components/Home";
import { createContext, useContext, useState } from "react";

export const MyContext = createContext({});

export default function Home() {

  const [img, setImg] = useState<any>();

  const providedValue = useContext(MyContext); 


  return (
   <div>
    <MyContext.Provider value={{ img, setImg }}>
      <HomePage/>
      </MyContext.Provider>
   </div>
  );
}
