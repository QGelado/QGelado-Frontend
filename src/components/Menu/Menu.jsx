import React, { useState } from 'react'
import { TbMenu2 } from "react-icons/tb";
import styles from './menu.module.css'

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(window.innerWidth > 768 ? true : false)
  return (
    <nav className={styles.nav}>
        <img src="./imgs/logo_qgelado.svg" alt="logo QGelado" className={styles.logo}/>
        <ul className={styles.navlinks} style={{display: openMenu ? 'flex' : 'none'}}>
            <li><a className={styles.link} href="#aplicativo">Aplicativo</a></li>
            <li><a className={styles.link} href="#produtos">Produtos</a></li>
            <li><a className={styles.link} href="#contato">Contato</a></li>
        </ul>
        <TbMenu2 className={styles.btnMenu} onClick={() => setOpenMenu(!openMenu)} size={30}/>
    </nav>
  )
}

export default Menu