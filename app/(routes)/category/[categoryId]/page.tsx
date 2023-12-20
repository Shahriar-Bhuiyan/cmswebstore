import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billborad";
import Container from "@/components/ui/container";
import Filter from "./components/filter";



interface CategoryPageProps{
  params:{
    categoryId:string;
  },
  searchParams:{
    colorId:string;
    sizeId:string;
  }
}
export const revalidate = 0;
const CategoryPage:React.FC<CategoryPageProps> = async({
    params,searchParams
})=>{

    const product = await getProducts({
        categoryId:params.categoryId,
        colorId:searchParams.colorId,
        sizeId:searchParams.sizeId
    })

    const sizes = await getSizes();
    const colors = await getColors()
    const category = await getCategory(params.categoryId)
    return (
        <div className="bg-white">
            <Container>
                      <Billboard data={category?.billboard}/>

                      {/* Mobile Filter */}
                      <div className="px-4 sm:px-6 pb-24">
                       <div className=" hidden lg:block">
                        {/* Size Filter */}
                             <Filter
                              valueKey="sizeId"
                              name="Sizes"
                              data={sizes}
                             />

                         {/* Color Filter */}

                         <Filter
                              valueKey="colorId"
                              name="Colors"
                              data={colors}
                             />
                       </div>
                      </div>
            </Container>
        </div>
    )
}

export default CategoryPage;