"use client"
import { useEffect, useState } from "react";
import Container from "./ui/container";

const Footer = ()=>{
    
    const [currentYear, setCurrentYear] = useState<string>(new Date().getFullYear().toString());

    useEffect(()=>{
        setCurrentYear(new Date().getFullYear().toString())
    },[])
   return(
    <footer className="bg-white border-t">
        {/* <Container> */}
        <div className="mx-auto py-10">
            <p className="text-center text-xs text-black">
               &copy; {currentYear} Developer Shahriar, All Rights Reserved
            </p>
          </div>
        {/* </Container> */}
    </footer>
   )
}

export default Footer