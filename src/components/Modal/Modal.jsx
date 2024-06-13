import React from 'react'
import styles from './modal.module.css'

const Modal = ({message}) => {
  return (
    <section className={styles.container}>
        <div className={styles.popup}>
            <p className={styles.message}>{message}</p>
        </div>
    </section>
  )
}

export default Modal