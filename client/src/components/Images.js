import { useContext } from "react"
import { ImageContext } from "../App"
import Image from "./Image"
import Skeleton from './Skeleton'


const Images = ()=>{
    const{response, isLoading, searchImage}=useContext(ImageContext);
    return(
        <div>
            <h1 className="text-center mt-6 text-2xl">Results for {searchImage || "..." }</h1>
            <div className="grid md:gird-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10
             mx-auto px-4 max-w-5xl">
                {isLoading ? <Skeleton item={12} /> : response.map((data,key)=><Image key={key} data={data} />)}

            </div>
        </div>
    )
}

export default Images