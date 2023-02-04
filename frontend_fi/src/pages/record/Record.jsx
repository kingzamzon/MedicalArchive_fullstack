import style from "./record.module.scss";
import { address,abi } from "../../constants";
import { useContractRead } from "wagmi";
import { useState } from "react";

const Record = () => {

    const [inputs,setInputs]=useState({
        patientID:"",
        recordID:""
    })

    const {userData,setUserData}=useState([])
    console.log(userData)
    function useGetData(event){
        event.preventDefault()
    const{data}=  useContractRead({
        mode: "recklesslyUnprepared",
        address: address[3141].address,
        chainId: 3141,
        abi: abi,
        args: inputs.recordID!= "" ? [inputs.patientID,inputs.recordID]:[inputs.patientID],
        functionName: inputs.recordID!=""? "getPatientRecord":"getPatientRecords",
        onError(error){console.log(error)}
    })
    setUserData(data)
    }
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
                    <button onClick={useGetData}>load</button>
                </div>
            </form>
        </section>
    );
};

export default Record;