import React, { useState } from "react";
import styles from "./styles.module.scss";
import AddForm from '../../components/addForm/AddForm';
import { NavigateFunction, useNavigate } from "react-router-dom";

function LandingScreen() {

    const navigate: NavigateFunction = useNavigate();

    const [isAddForm, setAddForm] = useState<boolean>(false);

    return (
        <div className={styles.main}>
            <div className={styles.wrap}>
                <div className={styles.title}>Vinyl Data Center</div>
                <div className={styles.buttonWrap}>
                    {isAddForm ? <AddForm handleCancel={(e: boolean) => setAddForm(e)} /> : null}
                    <div className={styles.button} onClick={() => setAddForm(true)}><span>Add Vinyl</span><div></div></div>
                    <div className={styles.button} onClick={() => navigate('/list/')}><span>Vinyl In DataBase</span><div></div></div>
                </div>
            </div>
        </div>
    )
}

export default LandingScreen
