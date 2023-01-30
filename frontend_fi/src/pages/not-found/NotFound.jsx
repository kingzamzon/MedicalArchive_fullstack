import style from './notFound.module.scss';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
    const
        history = useNavigate(),
        back = () => history(-1);

    return (
        <section className={style.notFound}>
            <div>
                <img src={require("../../assets/images/error.svg").default} />
                <span>
                    Oops! There's nothing to see here <br />
                    <Link onClick={back}>GO BACK</Link>
                </span>
            </div>
        </section>
    );
};

export default NotFound;