"use client"

import axios from "axios";
import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useLocation } from "react-use";

const AppContext = createContext<any>(undefined);

export function AppWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    const [vehicle_exterior, setVehicle_Exterior] = useState(false); 
    const [vehicle_interior, setVehicle_Interior] = useState(false); 
    const [vehicle_wheels, setVehicle_Wheels] = useState(false); 
    const [isVendor, setIsVendor] = useState<boolean | null>(null);
    const location = useLocation();
    const Router = useRouter();
    useEffect(()=>{



      
      const getVendor = async()=>{
        try { 
          const url:any = process.env.NEXT_PUBLIC_API_URL ;
          const token = localStorage.getItem('token');
          const response = await axios.get(`${url}/pwa/is_vendor`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`
              }
          });
          if(isVendor === null ){

            setIsVendor(response.data.isVendor);
            localStorage.setItem('isVendor',response.data.isVendor);
          }
          console.log(response.data);
      } catch (error:any) {
          //handle authentification
          if(error.status === 401){
            alert('Login session expired please login again!');
          Router.push('./authentification');
          }
        console.error(error);
      }
      }
      if(location.pathname !== '/authentification'){
      console.log(location)
        getVendor();
      }


      //

    },[])

    return (
        <AppContext.Provider value={{vehicle_exterior, setVehicle_Exterior,vehicle_interior, setVehicle_Interior ,vehicle_wheels, setVehicle_Wheels,isVendor,setIsVendor}}>
          <div id="main">

            {children}
          </div>
        </AppContext.Provider>
    )
  }

export function useAppContext(){
    return useContext(AppContext);
}