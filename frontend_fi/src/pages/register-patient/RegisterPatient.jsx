import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { address, abi } from "../../constants";
import { useContractWrite,useContractEvent } from "wagmi";
import { useState } from "react";
import style from "./register.module.scss";

const RegisterPatient = () => {
    const [patientName, setPatientName] = useState("");
    const [id,setId]=useState({id:"",isWaiting:false});
    const { data, isLoading, writeAsync } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: address[3141].address,
        chainId: 3141,
        abi: abi,
        args: [patientName],
        functionName: "addPatient",
        onSettled(data, error) {
            console.log('Settled', { data, error })
            setId(prev=>({...prev,isWaiting:true}))
        },
    });
    useContractEvent({
        address: address[3141].address,
        abi: abi,
        eventName: 'PatientAdded',
        listener(node, label, owner) {
          console.log({"1":node, "2":label, "3":owner})
          setId({isWaiting:false,id:label})
        },
      })
    return (
        <section className={style.send}>
            <h3>register new patient</h3>
            <small>Patient ID will be given after registration</small>
            <form className={style.form}>
                <input
                    name="name"
                    value={patientName}
                    onChange={(event) => setPatientName(event.target.value)}
                    type="text"
                    placeholder="Patients Name"
                />
                <button
                    disabled={!writeAsync}
                    onClick={async (event) => {
                        event.preventDefault();
                        await writeAsync();
                        
                    
                    }}
                >
                    register
                    <span>
                        {isLoading && (
                            <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                        )}
                    </span>
                </button>
                <div>
                    <span>patient ID: {id.isWaiting? <FontAwesomeIcon icon={faSpinner} className={style.spinner} />:`${id.id}`}</span>
                </div>
            </form>
        </section>
    );
};

export default RegisterPatient;
