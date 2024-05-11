import React from 'react'
import styles from './card.module.css'

const Card = () => {
  return (
    <div className={styles.box_card_sorvete}>
        <div className={styles.box_img_sorvete}>
            <img src="/src/assets/sorvetes.png" alt="" className={styles.img_sorvete}/>
        </div>
        <div className={styles.box_info_sorvete}>
            <h5 className={styles.title_sorvete}>Napolitano</h5>
            <p className={styles.text_sorvete}>Creme, chocolate e morango</p>
            <div className={styles.box_price_sorvete}>
                <span className={styles.price_rs_sorvete}>R$</span>
                <h4 className={styles.price_sorvete}>15,00</h4>
            </div>
        </div>
    </div>
  )
}

export default Card