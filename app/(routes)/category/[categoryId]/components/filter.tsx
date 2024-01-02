'use client'
import qs from "query-string";
import { Color, Size } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Button from "@/components/button";
import { cn } from "@/lib/utils";


interface FilterProps{
    name:string
    valueKey:string
    data:(Size|Color)[]
}
const Filter:React.FC<FilterProps> = ({data,valueKey,name}) => {
  
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const route = useRouter();
   
    
    const selectedValue = searchParams.get(valueKey);

    const onClick =(id:string,event: React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault();
      console.log("Button clicked:", id);

      const current = qs.parse(searchParams.toString());
      console.log(current)

      const query = {
        ...current,
        [valueKey]: id
      };
      console.log("query:",query)
    
      if (current[valueKey] === id) {
        query[valueKey] = null;
      }
    
      const url = qs.stringifyUrl({
        url: pathname,
        query
      }, { skipNull: true });
      console.log(url)
    
      route.push(url,{scroll:false});
    }
     

  return (
   <div className="mb-8">

    <h3 className="text-lg font-semibold">{name}</h3>
   <hr  className="my-4"/>

   <div className="flex flex-wrap gap-2">
    {data.map((filter,index)=>(
      <Button key={index} className={cn('rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300', selectedValue === filter?.id && 'bg-black text-white')}
      onClick={(e)=>onClick(filter?.id,e)}
      >
          {filter.name}
      </Button>
    ))}
   </div>
   </div>
  )
}

export default Filter;
