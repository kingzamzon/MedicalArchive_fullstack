import style from "./upload.module.scss";
import components from "../../components";

const Upload = () => {
    return (
        <section className={style.upload}>
            <h3>upload files</h3>
            <div>
                <components.Upload />
            </div>
        </section>
    );
};

export default Upload;