
const Cards=({id, date, description, cid})=>{
    return(
        <div>
            <img
                src={`https://ipfs.io/ipfs/${cid}`}
                alt={cid}
            />
            <p>{description}</p>
            <span> {`id:${id}`}</span><span>{date}</span>

        </div>
    )
}

export default Cards