import style from "./landing.module.scss";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <section className={style.landing}>
            <img src={require(`../../assets/images/eth.jpeg`)} alt="" />

            <p>
                <span>Decen</span>tralized medical <span>documentation</span> system, easy to use, secured and fast share!
            </p>
            <p>Send, recieve and share files & documents with your wall<span>et address</span></p>

            <div>
                <div>
                    <span>Ficave is a record of medical data on the blockchain, ease of access and storage.</span>
                    <div>
                        <span>01</span>
                        <span></span>
                        <span>02 03 04</span>
                    </div>
                </div>
                <div>
                    <Link to={"/files"}>Start Now</Link>
                    <Link>Learn More</Link>
                </div>
                <div>
                    <span>+127k</span>
                    <span>medical records stored and acessible globally by patients unique login pass</span>
                    <div>
                        <span><img src={require("../../assets/images/72.png")} alt="" /></span>
                        <span><img src={require("../../assets/images/73.jpeg")} alt="" /></span>
                        <span><img src={require("../../assets/images/74.jpeg")} alt="" /></span>
                        <span><img src={require("../../assets/images/75.jpeg")} alt="" /></span>
                    </div>
                    <span>upload - store - share</span>
                </div>
            </div>
        </section>
    );
};

export default Landing;