import style from "./send.module.scss";
import component from "../../components";
import { useState } from "react";

const Send = () => {
    const [reciever, setReciever] = useState("");

    return (
        <section className={style.send}>
            <h3>send files</h3>
            <form className={style.form}>
                <div>
                    <label htmlFor="reciever">reciever wallet address</label>
                    <input
                        type="text"
                        placeholder="D...a1b2c3"
                        // value={reciever}
                        onChange={null}
                    />
                </div>

                <component.Upload />
            </form>
        </section>
    );
};

export default Send;