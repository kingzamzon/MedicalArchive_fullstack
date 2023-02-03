import { faFileArrowUp, faSpinner, faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NFTStorage } from "nft.storage";
import { address, abi } from "../../constants";
import { useContractWrite } from "wagmi";
import axios from "axios";
import { useState } from "react";
import style from "./upload.module.scss";

const Upload = () => {
    const
        [files, setFiles] = useState([]),

        removeFile = (fileName) => {
            setFiles(files.filter((file) => file.name != fileName));
        },

        deleteFile = (_name) => {
            removeFile(_name);
        },

        pathname = window.location.pathname,

        button = function () {
            let text = pathname == "/send" ? "send" : "upload";
            return text;
        },

        text = button(),

        [cid, setCid] = useState({
            patientId: "",
            description: "",
            hash: "",
            password: ""
        }),

        { data, isLoading, isSuccess, writeAsync } = useContractWrite({
            mode: "recklesslyUnprepared",
            address: address[3141].address,
            chainId: 3141,
            abi: abi,
            args: [cid.patientId, cid.description, cid.hash],
            functionName: "addRecord",
        });

    function handleChange(event) {
        const { name, value } = event.target;
        setCid((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className={style.fileInput}>
            <input
                type="number"
                placeholder="Patient Id"
                name="patientId"
                value={cid.patientId}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Record Description"
                name="description"
                value={cid.description}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="always use same password"
                name="password"
                value={cid.password}
                onChange={handleChange}
            />
            <div onClick={() => document.querySelector("#upload").click()}>
                <div>
                    <input
                        type="file"
                        onChange={async (event) => {
                            const
                                NFT_STORE_API_KEY = process.env.REACT_APP_NFT_STORAGE,

                                client = new NFTStorage({ token: NFT_STORE_API_KEY }),

                                file = event.target.files[0];

                            file.isUploading = true;
                            setFiles([...files, file]);
                            const
                                icid = await client.storeBlob(file),

                                options = {
                                    method: "POST",
                                    headers: { "content-type": "application/json" },
                                    data: { cid: icid, password: cid.password },
                                    url: "https://medarchive2.onrender.com/encode",
                                };
                            await axios(options)
                                .then((response) => {
                                    file.isUploading = false;
                                    setFiles([...files, file]);
                                    setCid((prev) => ({
                                        ...prev,
                                        hash: response.data.hash,
                                        password: "",
                                    }));
                                })
                                .catch((error) => {
                                    console.error(error);
                                    removeFile(file.name);
                                });
                        }}
                        id="upload"
                        hidden
                        accept="image/*, video/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <span>Select Files or Documents</span>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M200.1 31.2A130.1 132.4 0 0 0 70.03 163.6a130.1 132.4 0 0 0 .55 11.3a80.98 73.47 0 0 0-52.21 68.6A80.98 73.47 0 0 0 99.35 317a80.98 73.47 0 0 0 37.25-8.3a189.3 80.97 0 0 0 70.4 15.6l49-49l49.2 49.2a189.3 80.97 0 0 0 31.3-4.8a91.09 67.8 0 0 0 66 21.1a91.09 67.8 0 0 0 91.1-67.8a91.09 67.8 0 0 0-58-63.1a70.1 81.72 20.61 0 0 2.6-6.2a70.1 81.72 20.61 0 0-36.8-101.2a70.1 81.72 20.61 0 0-76.9 22.8a130.1 132.4 0 0 0-124.4-94.1zM256 300.7L181.7 375H233v112h46V375h51.3L256 300.7z"
                            ></path>
                        </svg>
                    </span>
                </div>
            </div>

            <ul>
                {files &&
                    files.map(function (file, index) {
                        return (
                            <li key={index}>
                                <div>
                                    <span>
                                        <FontAwesomeIcon icon={faFileArrowUp} />
                                    </span>
                                    <span>{file.name}</span>
                                </div>
                                <span>
                                    {file.isUploading && (
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            className={style.spinner}
                                        />
                                    )}
                                    {!file.isUploading && (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => deleteFile(file.name)}
                                            className={style.trash}
                                        />
                                    )}
                                </span>
                            </li>
                        );
                    })}
            </ul>

            <div>
                <button disabled={!writeAsync} onClick={async () => await writeAsync()}>
                    {files.length > 1 ? `${text} all ${files.length} files` : `${text} file`}
                    <span>
                        {isLoading && (
                            <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                        )}
                    </span>
                    <span>{isSuccess && "success"}</span>
                </button>
            </div>
        </div>
    );
};

export default Upload;