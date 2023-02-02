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
            <h3>Add/Record new Patient</h3>
            <small>Patient Id will be given after adding patient</small>
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
                    Add Patient
                    <span>
                        {isLoading && (
                            <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                        )}
                    </span>
                </button>
                <span>{isSuccess && `Patient Id ${data.events[0].args}`}</span>
            </form>
        </section>
    );
};

export default RegisterPatient;
