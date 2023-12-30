'use client';

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";


const Summary = ()=>{
        const searchParams = useSearchParams();
        const Items = useCart((state)=>state.items);
        const removeAll = useCart((state)=>state.removeAll);

        useEffect(()=>{
          if(searchParams.get("success")){
            toast.success("Payment Completed.")
            removeAll();
          }

          if(searchParams.get("canceled")){
            toast.error("Something went wrong.")
          }

        },[searchParams,removeAll])

        const totalPrice = Items.reduce((total,item)=>{
            return total + Number(item.price)
        },0)

        const onChcekOut = async()=>{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY
            }/checkout`,{productIds:Items.map((item)=>item.id)});

            window.location = response.data.url;
        }
    
        return(
            <div
            className="
            mt-16
            rounded-lg
            bg-gray-50
            px-4
            py-6
            sm:p-6 
            lg:col-span-5
            "
            >
               <h2 className="text-lg font-medium text-gray-500">
                Order Summary 
               </h2>
               <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                     Order Total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
               </div>
               <Button onClick={onChcekOut} className="w-full mt-6">
                Check
               </Button>
            </div>
        )
}

export default Summary;