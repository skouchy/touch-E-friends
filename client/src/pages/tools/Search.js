import {useContext,useState} from "react"
import { ImageContext } from "../ImageSearch";

const SearchField =()=>{
    const[searchValue, setSearchValue]=useState("");

    const{fetchData, setSearchImage}= useContext(ImageContext);

    const handleInputChange = (e)=>{
        setSearchValue(e.target.value);
    }

    const handleButtonSearch=()=>{
        fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
        setSearchValue("");
        setSearchImage(searchValue);
    }

    const handleEnterSearch = e =>{
        if(e.key==='Enter'){
            fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
            setSearchValue("");
            setSearchImage(searchValue);
        }
    }

    return(
        <div className="flex">
            <input 
            className="bg-gray-50 border border-black text-sm w-full
            indent-2 p-3 outline-none focus:border-green-500 focus:ring-2
            rounded"
            type="Search"
            placeholder="Search Anything..."
            value={searchValue}
            onChange={handleInputChange}/>
            <button
            onClick={handleButtonSearch}
            onKeyDown={handleEnterSearch}
            disabled={!searchValue}
             className="bg-violet-200 px-6 py-2.5 text-blue-600 rounded
            focus:ring-2 focus:ring-green-700 disabled:bg-gray-400 font-bold">
                Search!</button>
        </div>
    )
}

export default SearchField