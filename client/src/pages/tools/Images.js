import { useContext } from "react"
import { ImageContext } from "../ImageSearch"
import Image from "./Image"
import Skeleton from './Skeleton'
import './Images.css'


const Images = ()=>{
    const{response, isLoading, searchImage}=useContext(ImageContext);
    return(
        <div>
            <h1 className="results">Results for {searchImage || "..." }</h1>
            <div className="img-ctn ">
                {isLoading ? <Skeleton item={12} /> : response.map((data,key)=><Image key={key} data={data} />)}

            </div>
        </div>
    )
}

export default Images
  
  