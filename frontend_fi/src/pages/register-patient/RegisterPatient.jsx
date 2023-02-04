import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { address, abi } from "../../constants";
import { useContractWrite } from "wagmi";
import { useState } from "react";
import style from "./register.module.scss";

const RegisterPatient = () => {
    const [patientName, setPatientName] = useState("");
    const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: address[3141].address,
        chainId: 3141,
        abi: abi,
        args: [patientName],
        functionName: "addPatient",
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
                    disabled={!writeAsync}
                    onClick={async (event) => {
                        event.preventDefault();
                        await writeAsync();
                        console.log(data, await data)
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
                    <span>patient ID: {isSuccess && `Patient Id ${useWaitForTransaction({
                        hash: data?.hash,
                        onSettled(data, error) {
                            const response = data ? data.logs : []
                            return response
                        }
                    })}`}</span>
                </div>
            </form>
        </section>
    );
};

export default RegisterPatient;
