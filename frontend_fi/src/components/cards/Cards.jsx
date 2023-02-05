
const Cards=({id, date, description, cid})=>{
    return(
        <div>
        <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">
            <img
                src={`https://ipfs.io/ipfs/${cid}`}
                alt={cid}
                style={{maxWidth:"300px"}}
            />
           </a>
            <p>{description}</p>
            <section style={{display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
            <span> {`id: ${id}`}</span><span >{(new Date(date*1000)).toDateString()}</span>
		</section>
        </div>
    )
}

export default Cards
