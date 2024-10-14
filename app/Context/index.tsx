"use client"

import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [vehicle_exterior, setVehicle_Exterior] = useState(false); 
    const [vehicle_interior, setVehicle_Interior] = useState(false); 
    const [vehicle_wheels, setVehicle_Wheels] = useState(false); 

    return (
        <AppContext.Provider value={{vehicle_exterior, setVehicle_Exterior,vehicle_interior, setVehicle_Interior ,vehicle_wheels, setVehicle_Wheels}}>
            {children}
        </AppContext.Provider>
    )
  }

export function useAppContext(){
    return useContext(AppContext);
}