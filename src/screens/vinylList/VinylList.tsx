import React from 'react'
import styles from './styles.module.scss';
import UseApiListHook from '../../customHooks/UseApiListHook'
import { ApiRequest } from '../../utils/types';
import Item from '../../components/item/Item';
import { Link } from 'react-router-dom';

function VinylList() {

    const request: ApiRequest = {
        endPoint: `http://localhost:3000/api/v1/posts`,
        method: 'GET',
    }

    const [apiData, loading, error] = UseApiListHook(request)
    error !== null && console.log(error);

    const itemMap = apiData.map((e) => {
        return (
            <Item item={e} key={e.id} />
        )
    })

    return (
        <div className={styles.main}>
            <div className={styles.bgLayer} />
            <div className={styles.wrap}>
                <Link className={styles.options} to='/'>Back To Options</Link>
                <div className={styles.itemWrap}>

                {loading ? <div>Loading...</div>
                    : <>
                    {itemMap.length !== 0 ? itemMap : <h1>No Vinyl found. Please return to Options to add a Vinyl.</h1>}
                    </>
                }
            </div>
            </div>
        </div>
    )
}

export default VinylList