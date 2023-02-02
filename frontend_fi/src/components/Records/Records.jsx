
const Records=({id, date, description, cid})=>{
    return(
        <div>
            <img
                src={`https://ipfs.io/ipfs/${cid}`}
            />
            <p>{description}</p>
            <span> {`id:${id}`}</span><span>{date}</span>

        </div>
    )
}

export default Records