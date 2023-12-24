'use client'

import Button from "@/components/button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";

interface MobileFilterProps{
    sizes:Size[]
    colors:Color[]
}

const MobileFilter:React.FC<MobileFilterProps> = ({sizes,colors})=>{

const [open,setOpen] = useState(false);
const onOpen = ()=>setOpen(true);
const onClose = ()=>setOpen(false);
    return (
        <>
        <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
            Filters
            <Plus size={20}/>
        </Button>
     
      <Dialog as="div" open={open} onClose={onClose}    className="relative z-40 lg:hidden">
    
       <div className="fixed inset-0 bg-black   bg-opacity-25" />
       {/* diglog position */}
       <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel>
                
            </Dialog.Panel>

       </div>
        

      </Dialog>
        </>
    )
}

export default MobileFilter;