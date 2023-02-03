import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./send.module.scss";
import { useState } from "react";
import { useContractWrite } from "wagmi";
import { address, abi } from "../../constants";

const Send = () => {
    const
        [shareData, setShareData] = useState({
            to: "",
            patientId: "",
            recordId: ""
        }),

        { isLoading, isSuccess, writeAsync } = useContractWrite({
            mode: "recklesslyUnprepared",
            address: address[3141].address,
            chainId: 3141,
            abi: abi,
            args: [shareData.to, shareData.patientId, shareData.recordId],
            functionName: "sharePatientsRecord",
        });

    function handleChange(event) {
        const { name, value } = event.target;
        setShareData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <section className={style.send}>
            <h3>send files</h3>
            <form className={style.form}>
                <div>
                    <label htmlFor="reciever">reciever wallet address</label>
                    <input
                        type="text"
                        placeholder="D...a1b2c3"
                        value={shareData.to}
                        onChange={handleChange}
                        name="to"
                    />
                    <input
                        type="number"
                        placeholder="Patient ID"
                        name="patientId"
                        value={shareData.patientId}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Record ID"
                        name="recordId"
                        value={shareData.recordId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button
                        disabled={!writeAsync}
                        onClick={async (event) => {
                            event.preventDefault();
                            await writeAsync();
                        }}>
                        send record
                        <span>
                            {isLoading && (
                                <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                            )}
                        </span>
                        <span>{isSuccess && "Sent"}</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Send;
