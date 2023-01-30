import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faHouse, faFolder, faCloudArrowUp, faPaperPlane, faShareNodes, faTrashCan, faBell, faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";
import style from "./navbar.module.scss";
import "./style.css";

const NavbarSignedIn = () => {
    const [user,setUser] = useState("User");
    
    const StyledButton = styled.button`
    cursor: pointer;
    height: 49px;
    width: 200px;
    border-radius: 45px;
    font-size: 1.25rem;
    text-transform: capitalize;
    margin-top:-25px;
  
    transition: 200ms ease;
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 6px 40px -6px #1a88f8;
    }
    &:active {
      transform: translateY(-3px);
      box-shadow: 0 6px 32px -6px #1a88f8;
    }
  `;

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
                        <li>
                        <ConnectKitButton.Custom>
                            {({ isConnected, show, truncatedAddress, ensName }) => {
                                return (
                                <StyledButton onClick={show}>
                                    {(isConnected ? ensName ?? truncatedAddress : "Connect" && setUser("User")) && (setUser(truncatedAddress))}
                                    
                                </StyledButton>
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