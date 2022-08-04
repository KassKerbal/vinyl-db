import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import UseApiDetailHook from '../../customHooks/UseApiDetailHook'
import { ApiRequest } from '../../utils/types';
import { Link, NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import ApiRemove from '../../utils/ApiRemove';
import AddForm from '../addForm/AddForm';

function VinylDetail() {

  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const [isAddForm, setAddForm] = useState<boolean>(false);

  const request: ApiRequest = {
    endPoint: `http://localhost:3000/api/v1/posts/`,
    method: 'GET',
    id: id,
  }
  const [apiData, loading, error, apiController] = UseApiDetailHook(request)
  const handleChange = () => {
    setAddForm(true)
  }

  useEffect(() => {
    apiController()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddForm])


  const handleDelete = () => {
    navigate('/list/');
    ApiRemove(id);
  }

  error !== null && console.log(error);

  return (
    <>
      {apiData !== undefined && !loading ?
        <div className={styles.main}>
          <div className={styles.bgLayer} />
          <div className={styles.wrap}>
            <Link className={styles.options} to='/list'>Back To List</Link>
            {isAddForm ? <AddForm data={apiData} id={id} handleCancel={(e: boolean) => setAddForm(e)} /> : null}
            <div className={styles.itemWrap}>
              <div className={styles.text}>Title: <span>{apiData.title}</span> </div>
              <div className={styles.text}>Description: <span>{apiData.content}</span> </div>
              <div className={styles.text}>Artist: <span>{apiData.lat}</span> </div>
              <div className={styles.text}>Type: <span>{apiData.long}</span> </div>
              <div className={styles.controller}>
                <span className={styles.delete} onClick={handleDelete}>Delete</span>
                <span className={styles.changeData} onClick={handleChange}>Change Data</span>
              </div>
            </div>
          </div>

        </div>
        : <div>Loading...</div>
      }
    </>
  )
}

export default VinylDetail