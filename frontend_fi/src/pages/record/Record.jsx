import style from "./record.module.scss";

const Record = () => {
    return (
        <section className={style.record}>
            <h3>access patient record</h3>
            <form>
                <div>
                    <label htmlFor="patientID">patient ID</label>
                    <input
                        type="text"
                        placeholder='0X63HSha749404'
                    />
                </div>
                <div>
                    <label htmlFor="recordID">record ID</label>
                    <input
                        type="number"
                        placeholder='Optional'
                    />
                </div>
                <div>
                    <button>load</button>
                </div>
            </form>
        </section>
    );
};

export default Record;