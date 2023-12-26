'use client'
import React, { useState,  forwardRef } from "react";
import Button from "@/components/button";
import { Transition } from '@headlessui/react'
import IconButton from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import Filter from "./filter";


interface MobileFilterProps{
    sizes:Size[]
    colors:Color[]
}

const MobileFilter: React.FC<MobileFilterProps> = ({ sizes, colors }) => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);


    let MyDialogPanel = forwardRef(
        function (
          props: React.PropsWithChildren<{}>,
          ref:any
        ) {
          return (
            <Dialog.Panel
              as="div"
              className={cn(
                "relative ml-auto flex h-full w-[100%] max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition-all transform duration-1000 translate-x-100"
              )}
              ref={ref}
              {...props}
            />
          );
        }
      );
  
  
    return (
      <>
        <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
          Filters
          <Plus size={20} />
        </Button>
       

        <Transition as={Dialog} onClose={onClose}
         show={open} unmount={true} appear={true}
         >
        
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          {/* dialog position */}
          <div className="fixed inset-0 flex w-full">
            <Transition.Child
            as={MyDialogPanel}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            >
              {/* Close button */}
              <div className="flex items-center justify-self-center px-4">
                <IconButton icon={<X size={15} onClick={onClose} />} />
              </div>

              <div className="p-4">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
            </div>
            </Transition.Child>
          </div>
        </Transition>
      </>
    );
  };
export default MobileFilter;