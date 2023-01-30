import style from "./navbar.module.scss";
import { Link } from "react-router-dom";

const NavbarSignedOut = () => {
    return (
        <section className={style.navbar} >
            <div>FiCave</div>

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

            <Link>connect</Link>
        </section>
    );
};

export default NavbarSignedOut;