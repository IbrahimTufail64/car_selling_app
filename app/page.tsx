"use client"

import HomePage from "./components/Home";
import { createContext, useContext, useState } from "react";

interface MyContextValue {
  exterior_done: boolean;
  setExteriorDone: (value: boolean) => void;
}

export const MyContext = createContext<MyContextValue>({
  exterior_done: false,
  setExteriorDone: () => {}
});

export default function Home() {

  const [exterior_done, setExteriorDone] = useState(false);


  return (
   <div>
    <MyContext.Provider value={{ exterior_done, setExteriorDone }}>
      <HomePage/>
    </MyContext.Provider>
   </div>
  );
}
