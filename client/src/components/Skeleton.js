
const Skeleton=({item})=>{
    return[...Array(item).keys()].map(() =>(
        <div className="animate-pulse">
            <div className="bg-black rounded-lg h-72"></div>
        </div>
    ))
}

export default Skeleton