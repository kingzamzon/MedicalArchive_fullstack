import style from "./record.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { address as addr, abi } from "../../constants";
import components from "../../components";
import { useContractRead, useAccount } from "wagmi";
import axios from "axios";
import { useState, useEffect } from "react";

const Record = () => {
    const
        [inputs, setInputs] = useState({
            patientID: "",
            recordID: "",
            password: "",
            loading: false,
            show: false
        }),

        { address } = useAccount(),

        [userData, setUserData] = useState([]),

        [hashes, setHashes] = useState([]);

    useEffect(() => {
        const decryptedHashes = userData.map((record, index) => ({
            ...record,
            cid: hashes[index]
        }));
        setUserData(decryptedHashes);
    }, [hashes]);

    const
        processHashes = async () => {
            setInputs(prev => ({
                ...prev,
                loading: true
            }));

            const
                encryptedHashes = userData.map((record) => record.cid),
                options = {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    data: {
                        cids: encryptedHashes,
                        password: inputs.password
                    },
                    url: "https://medarchive2.onrender.com/decode",
                };

            await axios(options)
                .then((response) => {
                    console.log(response.data);
                    setInputs(prev => ({
                        ...prev,
                        password: ""
                    }));
                    setHashes(response.data.cids);
                })
                .catch((error) => {
                    console.error(error);
                });

            setInputs(prev => ({
                ...prev,
                show: true
            }));
        },

        contractRead = useContractRead({
            mode: "recklesslyUnprepared",
            address: addr[3141].address,
            chainId: 3141,
            abi: abi,
            args: inputs.recordID != "" ? [inputs.patientID, inputs.recordID] : [inputs.patientID],
            functionName: inputs.recordID != "" ? "getPatientRecord" : "getPatientRecords",
            overrides: { from: address },
            onSuccess(data) {
                setUserData(data);
            },
            onError(error) { console.log(error); }
        }),

        handleChange = (event) => {
            const { name, value } = event.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }));
        },

        RecordComponents = userData.map((data) => (
            <components.Cards
                id={data.id.toString()}
                date={data.date.toString()}
                cid={data.cid}
                description={data.description}
            />
        ));

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
                    <button
                        onClick={async (event) => {
                            event.preventDefault();
                            await processHashes();
                            setInputs(prev => ({
                                ...prev,
                                loading: false
                            }));
                        }}
                    >
                        {
                            inputs.loading
                                ? <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                                : "load"
                        }
                    </button>
                </div>
            </form>
            {inputs.show && <div style={{display:"flex",flexDirection:"row",gap:"15px"}}>{RecordComponents}</div>}
        </section>
    );
};

export default Record;
