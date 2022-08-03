import React from 'react'
import styles from './styles.module.scss';
import { useForm } from "react-hook-form";
import ApiUpload from '../../utils/ApiUpload';
import { DataForm } from '../../utils/types';

interface AddFormProps {
    handleCancel: Function;
    id?: string;
    data?: DataForm;
}

function AddForm({ handleCancel, id, data }: AddFormProps) {

    const { register, handleSubmit } = useForm<DataForm>();

    const onSubmit = (event: DataForm) => {
        id ? ApiUpload({vinyl: event, id: id}) : ApiUpload({vinyl: event});
        handleCancel(false);
    }

    return (
        <div className={styles.main}>
            <form className={styles.formInput} onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={data && data.title} {...register("title", { required: true })} placeholder={"Title"} />
                <input  defaultValue={data && data.content}{...register("content", { required: true })} placeholder={"Description"} />
                <input  defaultValue={data && data.lat}{...register("lat", { required: true })} placeholder={"Artist"} />
                <select {...register("long")} >
                    <option value="Single">Single</option>
                    <option value="Long Play">Long Play</option>
                </select>
                <div className={styles.submitWrap}>
                    <button className={`${styles.button} ${styles.cancel}`} onClick={() => handleCancel(false)}>Cancel</button>
                    <input
                        className={`${styles.button} ${styles.submit}`}
                        type="submit"
                        value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default AddForm