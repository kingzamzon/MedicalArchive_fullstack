import { faEllipsisVertical, faFolderTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../files.module.scss";

const File = ({ files }) => {
    return (
        <>
            {
                files.map(function (file) {
                    const
                        { id, name, created, shared, files } = file,
                        { time, date } = created,
                        { h, m, s } = time,
                        { month, day, year } = date,
                        { persons, others } = shared;

                    return (
                        <div key={id} className={style.file}>
                            <div className={style.top}>
                                <span><FontAwesomeIcon icon={faFolderTree} /></span>
                                <div>
                                    <span>{name}</span>
                                    <span>{month} {day}, {year}, {h}:{m}:{s} </span>
                                </div>
                                <span><FontAwesomeIcon icon={faEllipsisVertical} /> </span>
                            </div>
                            <div className={style.bottom}>
                                <div>
                                    <span>shared users</span>
                                    <div>
                                        {
                                            persons.map(function (person, index) {
                                                return (
                                                    <span key={index}>
                                                        <img src={require(`../../../assets/images/${person}`)} />
                                                    </span>
                                                );
                                            })
                                        }
                                        <span>+{others}</span>
                                    </div>
                                </div>
                                <div>
                                    <span>files</span>
                                    <div>
                                        <span>{files}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};

export default File;