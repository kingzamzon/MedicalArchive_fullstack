import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { address, abi } from "../../constants";
import { useContractWrite,useWaitForTransaction } from "wagmi";
import { useState } from "react";
import style from "./register.module.scss";

const RegisterPatient = () => {
    const [patientName, setPatientName] = useState("");
    const [id,setId]=useState("");
    const { data, isLoading, isSuccess, write } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: address[3141].address,
        chainId: 3141,
        abi: abi,
        args: [patientName],
        functionName: "addPatient",
        onSettled(data, error) {
            console.log('Settled', { data, error })
        },
    });
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
                    disabled={!write}
                    onClick={async (event) => {
                        event.preventDefault();
                        await write();
                        
                        console.log(data.wait,"")
                    }}
                >
                    register
                    <span>
                        {isLoading && (
                            <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                        )}
                    </span>
                </button>
                <div>{data.events[0].args}
                    <span>patient ID: {`Patient Id ${id} ${useWaitForTransaction({
                        hash: data?.hash,
                        onSettled(data, error) {
                            console.log(data.events[0].args)
                            const response = data ? data.logs[0] : []
                            console.log(response)
                            setId(response)
                        }
                        
                    })}`}</span>
                </div>
            </form>
        </section>
    );
};

export default RegisterPatient;
