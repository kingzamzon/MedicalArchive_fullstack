import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFolder, faCloudArrowUp, faPaperPlane, faShareNodes, faTrashCan, faBell, faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import "./style.css";

const NavbarSignedIn = () => {
    const user = "defiprince";

    return (
        <section className={style.navbar}>
            <div className={style.nav_left}>
                <h2>FiCave</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={"/"}>
                                <FontAwesomeIcon icon={faHouse} />
                                home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/files"}>
                                <FontAwesomeIcon icon={faFolder} />
                                my files
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/upload"}>
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                                upload
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/send"}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                send files
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/shared"}>
                                <FontAwesomeIcon icon={faShareNodes} />
                                shared
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/deleted"}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                deleted
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={style.nav_right}>
                <h3>Welcome, {user}! 👋</h3>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Search in Cave" />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <span>
                        <img src={require("../../assets/images/19.png")} />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default NavbarSignedIn;