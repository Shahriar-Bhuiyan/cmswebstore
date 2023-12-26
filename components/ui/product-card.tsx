'use client'
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";


interface ProductCard{
    data:Product
}
const ProductCard:React.FC<ProductCard> = ({data})=>{
   const previewModal = usePreviewModal();
   const router  = useRouter()

    const handleClick = ()=>{
        router.push(`/product/${data?.id}`);
        console.log(data.category.name)
    }
 
    const onPreview:MouseEventHandler<HTMLButtonElement>=(event)=>{
      event.stopPropagation();
      previewModal.onOpen(data);
    }

 return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border px-3 space-y-4">
        {/* image and action */}
        <div className="aspect-square rounded-xl bg-gray-100 relative">
             <Image src={data?.images?.[0].url} fill alt="Product_images"
             className="aspect-square object-cover
             rounded-md"
             />
             <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                <div className="flex gap-x-6 justify-center">
                   <IconButton icon={<Expand size={20} className="text-gray-600"/>} onClick={onPreview}/>
                   <IconButton icon={<ShoppingCart size={20} className="text-gray-600"/>} onClick={()=>{}}/>
                </div>
             </div>
        </div>
         {/* Description */}
        <div>
           <p className="font-semibold text-lg">
            {data?.name}
           </p>
           <p className="text-sm text-gray-500">
            {data?.category.name}
           </p>
        </div>
        {/* Price */}

        <div className="flex items-center justify-between">
            <Currency value={data?.price}/>
        </div>
    </div>
 )
}

export default ProductCard;