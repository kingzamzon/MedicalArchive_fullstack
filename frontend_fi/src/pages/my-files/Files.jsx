import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
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
                    <NavLink to={"/upload"}>
                        <FontAwesomeIcon icon={faAdd} />
                        
                        add new
                    </NavLink>
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