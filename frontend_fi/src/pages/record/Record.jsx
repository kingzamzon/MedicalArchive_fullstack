import style from "./record.module.scss";
import { address as addr,abi } from "../../constants";
import { useContractRead , useAccount} from "wagmi";
import axios from "axios";
import { useState, useEffect } from "react";

const Record = () => {

    const [inputs,setInputs]=useState({
        patientID:"",
        recordID:"",
        password:""
    })
    const {address}=useAccount()

    const [userData,setUserData]=useState([])
    const [hashes,setHashes]=useState([])


    useEffect(()=>{
        const decryptedHashes=userData.map((record,index)=>({...record,cid:hashes[index]}))
        setUserData(decryptedHashes)
    },[hashes])

    const processHashes=async()=>{
        const encryptedHashes=userData.map((record)=>record.cid)
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            data: { cids: encryptedHashes, password: inputs.password },
            url: "https://medarchive2.onrender.com/decode",
        };
        await axios(options)
            .then((response) => {
                console.log(response.data)
                setInputs(prev=>({...prev,password:""}))
                setHashes(response.data.cids);
            })
            .catch((error) => {
                console.error(error);
            });
        
    }
    const contractRead=  useContractRead({
        mode: "recklesslyUnprepared",
        address: addr[3141].address,
        chainId: 3141,
        abi: abi,
        args: inputs.recordID!= "" ? [inputs.patientID,inputs.recordID]:[inputs.patientID],
        functionName: inputs.recordID!=""? "getPatientRecord":"getPatientRecords",
        overrides:{from:address},
        onSuccess(data){
            setUserData(data)
        },
        onError(error){console.log(error)}
    })
    const handleChange=(event)=>{
        const {name, value}=event.target;
        setInputs(prev=>({...prev,[name]:value}));
    }
    return (
        <section className={style.record}>
            <h3>access patient record</h3>
            <form>
                <div>
                    <label htmlFor="patientID">patient ID</label>
                    <input
                        name="patientID"
                        value={inputs.patientID}
                        onChange={handleChange}
                        type="number"

                        placeholder='0X63HSha749404'
                    />
                </div>
                <div>
                    <label htmlFor="recordID">record ID</label>
                    <input
                        name="recordID"
                        value={inputs.recordID}
                        onChange={handleChange}
                        type="number"
                        placeholder='Optional'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        type="password"
                        placeholder='always use same password'
                    />
                </div>
                <div>
                    <button onClick={async(event)=>{
                            event.preventDefault()
                            await processHashes()
                    }}>load</button>
                </div>
            </form>
        </section>
    );
};

export default Record;