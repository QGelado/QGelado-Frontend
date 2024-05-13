import React from 'react'
import styles from './card.module.css'
import { getImage } from '../../utils/getImage'

const Card = ({sorvete}) => {
  return (
    <div className={styles.box_card_sorvete}>
        <div className={styles.box_img_sorvete}>
            <img src={getImage(sorvete?.imagem)} alt="" className={styles.img_sorvete}/>
        </div>
        <div className={styles.box_info_sorvete}>
            <h5 className={styles.title_sorvete}>{sorvete?.nome}</h5>
            <p className={styles.text_sorvete}>{sorvete?.descricao}</p>
            <div className={styles.box_price_sorvete}>
                <span className={styles.price_rs_sorvete}>R$</span>
                <h4 className={styles.price_sorvete}>{sorvete?.preco}</h4>
            </div>
        </div>
    </div>
  )
}

export default Card