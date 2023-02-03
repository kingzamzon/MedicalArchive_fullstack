import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faHouse, faFolder, faCloudArrowUp, faPaperPlane, faShareNodes, faBell, faGear, faMagnifyingGlass, faPassport, faClipboardUser, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import style from "./navbar.module.scss";
import "./style.css";

const NavbarSignedIn = () => {
    const [user, setUser] = useState("User");

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
                            <NavLink to={"/register"}>
                                <FontAwesomeIcon icon={faPassport} />
                                register
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
                            <NavLink to={"/record"}>
                                <FontAwesomeIcon icon={faClipboardUser} />
                                records
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/archive"}>
                                <FontAwesomeIcon icon={faBoxesPacking} />
                                archive
                            </NavLink>
                        </li>
                        <li>
                            <ConnectKitButton.Custom>
                                {({ isConnected, show, truncatedAddress }) => {
                                    return (
                                        <button onClick={show}>
                                            {isConnected ? user : "Connect"}
                                            {
                                                (isConnected
                                                    ? truncatedAddress
                                                    : "Connect" && setUser("User"))
                                                && (setUser(truncatedAddress))
                                            }
                                        </button>
                                    );
                                }}
                            </ConnectKitButton.Custom>
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