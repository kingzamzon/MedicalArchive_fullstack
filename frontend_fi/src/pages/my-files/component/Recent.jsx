import style from "../files.module.scss";

const Recent = ({ files }) => {
    return (
        <>
            {
                files.map(function (file) {
                    const { id, image, path } = file;

                    return (
                        <div key={id}>
                            <img src={require(`../../../assets/images/${image}`)} alt="image" />
                            <span>{path}</span>
                        </div>
                    );
                })
            }
        </>
    );
};

export default Recent;