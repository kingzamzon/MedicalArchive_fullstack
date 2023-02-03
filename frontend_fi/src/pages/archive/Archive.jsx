import style from "./archive.module.scss";
import axios from "axios";
import { useState } from "react";

const Archive = () => {
    const
        [files, setFiles] = useState([]),

        removeFile = (fileName) => {
            setFiles(files.filter((file) => file.name != fileName));
        },

        deleteFile = (_name) => {
            removeFile(_name);
        };

    return (
        <section className={style.archive}>
            <small>Upload and encrypt your files. Set acess price for people to get it</small>
            <form>
                <div
                    onClick={() => document.querySelector("#upload").click()}>
                    <label htmlFor="price">enter price</label>
                    <div>
                        <input
                            type="file"
                            onChange={
                                (event) => {
                                    const file = event.target.files[0];
                                    file.isUploading = true;
                                    setFiles([...files, file]);

                                    const formData = new FormData();
                                    formData.append(
                                        file.name,
                                        file,
                                        file.name
                                    );

                                    axios
                                        .post("http://localhost:8000/send", formData)
                                        .then((response) => {
                                            file.isUploading = false;
                                            setFiles([...files, file]);
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            removeFile(file.name);
                                        });
                                }
                            }
                            id="upload"
                            hidden
                            multiple
                            accept="image/*, video/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <span>Select Files or Documents</span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M200.1 31.2A130.1 132.4 0 0 0 70.03 163.6a130.1 132.4 0 0 0 .55 11.3a80.98 73.47 0 0 0-52.21 68.6A80.98 73.47 0 0 0 99.35 317a80.98 73.47 0 0 0 37.25-8.3a189.3 80.97 0 0 0 70.4 15.6l49-49l49.2 49.2a189.3 80.97 0 0 0 31.3-4.8a91.09 67.8 0 0 0 66 21.1a91.09 67.8 0 0 0 91.1-67.8a91.09 67.8 0 0 0-58-63.1a70.1 81.72 20.61 0 0 2.6-6.2a70.1 81.72 20.61 0 0-36.8-101.2a70.1 81.72 20.61 0 0-76.9 22.8a130.1 132.4 0 0 0-124.4-94.1zM256 300.7L181.7 375H233v112h46V375h51.3L256 300.7z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="price">enter price</label>
                    <input type="number" placeholder="Min: 0.25" />
                    <div>
                        <span>1.34 Fil</span>
                        <span>Balance: 34 Fil</span>
                    </div>
                </div>

                <div>
                    <label htmlFor="description">description</label>
                    <textarea placeholder="Write File Description"></textarea>
                </div>

                <div>
                    <button>upload</button>
                </div>
            </form>
        </section>
    );
};

export default Archive;