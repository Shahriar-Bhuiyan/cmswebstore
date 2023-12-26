import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import { AlertTriangle } from 'lucide-react';

import { Product } from "@/types";

interface CartStore{
    items:Product[];
    addItem:(data:Product)=>void;
    removeItem:(id:string)=>void;
    removeAll:()=>void;
}


const useCart = create(
    persist<CartStore>((set,get)=>(
        {
            items:[],
            addItem:(data:Product)=>{
                const currentItem = get().items;
                const existingItem = currentItem.find((item)=>item.id === data.id);
    
                if(existingItem){
                    return toast("Item Alreay in Cart")
                }
    
                set({items:[...get().items,data]});
                toast.success('Item Added to Cart')
            },
            removeItem:(id:string)=>{
                set({items:[...get().items.filter((item)=>item.id !== id)]})
            },
            removeAll:()=>set({items:[]})
        }
    ),{
        name:'cart-storage',
        storage:createJSONStorage(()=>localStorage)
    }));

  export default useCart
  


