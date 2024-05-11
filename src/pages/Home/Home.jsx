import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SiIfood } from "react-icons/si";
import Menu from '../../components/Menu/Menu'
import { api } from '../../api/api';
import axios from 'axios';
import Card from '../../components/Card/Card';

const Home = () => {
  const [sorvetes, setSorvetes] = useState(["/src/assets/sorvetes.png", "/src/assets/sorvetes.png", "/src/assets/sorvetes.png", "/src/assets/sorvetes.png"]);
  const [sorvete, setSorvete] = useState("/src/assets/sorvetes.png")
  const [textFilter, setTextFilter] = useState('Todos')
  const [filters, setFilters] = useState(['Todos', 'Sorvete de massa', 'Picolé'])

  useEffect(() =>{
    async function getSorvetes() {
      try{
        axios.get('https://6sncggx0-3000.brs.devtunnels.ms/sorvete-padrao')
        .then((response) =>{
          console.log(response);
        })
        .catch((e) => console.log(e))
      }catch(e){
        console.error(e);
      }
    }
    getSorvetes()
  },[])
  return (
    <>
      <Menu/>
      <main className={styles.main}>
        <section className={styles.section_title}>
          <h1 className={styles.title}>A melhor Sorveteria do seu bairro!</h1>
          <MdOutlineKeyboardArrowDown className={styles.arrow_down} size={40} color='#fff'/>
        </section>
        <aside className={styles.select_sorvete}>
          <div className={styles.imgs_sorvetes_selects_main}>
            <img src={sorvete} alt="sorvete misterioso" className={styles.img_sorvete_selected}/>
            <a href="#" className={styles.btnMonteSorvete}>Monte o seu sorvete</a>
          </div>
          <div className={styles.imgs_sorvetes_selects}>
            {
              sorvetes.map((foto, index) => {
                return <img src={foto} className={foto === sorvete ? styles.sorvete_selected : styles.sorvete_select} key={index} onClick={() => setSorvete(foto)}/>
              })
            }
          </div>
        </aside>
      </main>
      <img src="/src/assets/blue_waves.svg" alt="blue waves" />
      <section className={styles.view_sorvetes} id='#produtos'>
        <h2 className={styles.title_view_sorvetes}>Nossos produtos</h2>
        <div className={styles.btns_filter}>
          {
            filters.map((filter) => (
            <button 
            className={filter === textFilter ? styles.btn_filter : styles.btn_filter_selected} 
            key={filter}
            onClick={() => setTextFilter(filter)}
            >
              {filter}
            </button>))
          }
        </div>
        <div className={styles.box_sorvetes}>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <p className={styles.text_more}>Ver Mais +</p>
      </section>
      <section
      className={styles.section_app} id='aplicativo'>
        <aside>
          <div className={styles.ball_app}>
            <img src="/src/assets/celular.png" alt="app QGelado" className={styles.cell_app}/>
          </div>
        </aside>
        <div className={styles.download_app}>
          <h3 className={styles.title_app}>Baixe o aplicativo</h3>
          <p className={styles.text_app}>Monte seu próprio sorvete e faça seu pedido!</p>
          <img src="/src/assets/qrcode.png" alt="QR CODE App QGelado" className={styles.qrcode_app}/>
        </div>
      </section>
      <img src="/src/assets/pink_waves.svg" alt="pink waves" />
      <section className={styles.contato} id='contato'>
        <img src="/src/assets/logo_QGelado.svg" alt="Logo QGelado" className={styles.contato_logo}/>
        <div className={styles.contato_links}>
          <a href="#aplicativo">Aplicativo</a>
          <a href="#produtos">Nossos Produtos</a>
        </div>
        <div className={styles.contato_icons}>
          <a href="" className={styles.contato_icon}>
            <FaPhoneAlt size={25}/>
          </a>
          <a href="" className={styles.contato_icon}>
            <FaWhatsapp size={25}/>
          </a>
          <a href="" className={styles.contato_icon}>
            <SiIfood size={25}/>
          </a>
        </div>
      </section>
      <footer className={styles.footer}>
          <p>Desenvolvido por Leste Dev. Todos os direitos reservados © 2024</p>
      </footer>
    </>
  )
}

export default Home