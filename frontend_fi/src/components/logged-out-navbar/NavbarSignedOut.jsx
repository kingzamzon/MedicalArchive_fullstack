import style from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";

const NavbarSignedOut = () => {
    return (
        <section className={style.navbar}>
            <h1>FiCave</h1>

            <nav>
                <ul>
                    <li>
                        <Link>explore</Link>
                    </li>
                    <li>
                        <Link>documentation</Link>
                    </li>
                    <li>
                        <Link>media kit</Link>
                    </li>
                    <li>
                        <Link>files</Link>
                    </li>
                </ul>
            </nav>

            <Link><ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress }) => {
                    return (
                        <button onClick={show}>
                            {isConnected ? truncatedAddress : "Connect"}
                        </button>
                    );
                }}
            </ConnectKitButton.Custom></Link>
        </section>
    );
};

export default NavbarSignedOut;