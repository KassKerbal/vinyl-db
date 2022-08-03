import React from 'react'
import styles from './styles.module.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { DataForm } from '../../utils/types';

interface ItemProps {
  item: DataForm;
}

function Item({ item }: ItemProps) {

  const navigate: NavigateFunction = useNavigate();
    
  const handleNavigate = (e:string) => {
      navigate(e)
  }

  return (
    <div className={styles.main} onClick={() => handleNavigate(`/list/${item.id}`)}>
      <div className={styles.text}>Title: <span>{item.title}</span> </div>
      <div className={styles.text}>Description: <span>{item.content}</span> </div>
      <div className={styles.text}>Artist: <span>{item.lat}</span> </div>
      <div className={styles.text}>Type: <span>{item.long}</span> </div>
    </div>
  )
}

export default Item