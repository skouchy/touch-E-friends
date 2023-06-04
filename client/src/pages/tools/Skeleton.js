import "./Skeleton.css"

const Skeleton=({item})=>{
    return[...Array(item).keys()].map(() =>(
        <div className="img-cards animate-pulse">
            <div className="img-section"></div>
        </div>
    ))
}

export default Skeleton