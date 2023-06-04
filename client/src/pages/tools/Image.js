import './Image.css'

const Image=({data})=>{
    return(
        <a href={data.urls.regular} target="_blank" rel="noreferrer">
            <img className="imgcard h-72 w-full object-cover rounded-md shadow-md"
            src={data.urls.small} alt={data.alt_description} />
        </a>

    )
}

export default Image