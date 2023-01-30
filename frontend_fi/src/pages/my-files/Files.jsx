import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./files.module.scss";
import File from "./component/File";
import Recent from "./component/Recent";
import { files, recent } from "../../assets/data";

const Files = () => {
    return (
        <section className={style.files}>
            <div className={style.allFiles}>
                <div className={style.nav}>
                    <h4>all records</h4>
                    <button>
                        <FontAwesomeIcon icon={faAdd} />
                        add new
                    </button>
                </div>
                <div className={style.filesContainer}>
                    <File files={files} />
                </div>
            </div>

            <div className={style.recentFiles}>
                <div>
                    <h4>recent files</h4>
                    <img src={require("../../assets/images/recent.png")} />
                </div>
                <div className={style.recentContainer}>
                    <Recent files={recent} />
                </div>
            </div>
        </section>
    );
};

export default Files;