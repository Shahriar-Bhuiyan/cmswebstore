import { create } from "zustand";
import { Product } from "@/types";

import { persist,createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore{
    items:Product[];
    addItem:(data:Product)=>void;
    removeItem:(id:string)=>void;
    removeAll:()=>void;
}

const useCart = create(persist<CartStore>((set,get)=>({

    items:[],
    addItem:(data:Product)=>{
        const currentProduct = get().items;
        const existingProduct = currentProduct.find((item)=>item.id === data.id);

        if(existingProduct){
            return toast('Item Already in Cart')
        }

        set({items:[...get().items,data]});
        toast.success("Product added to cart")
    },

    removeItem:(id:string)=>{
        set({items:[...get().items.filter((item)=>item.id !== id)]});
        toast.success('Item removed from cart');
    },

    removeAll:()=>{
        set({items:[]})
    }

}),{
    name:'cart-storage',
    storage:createJSONStorage(()=>localStorage)
}));

export default useCart;