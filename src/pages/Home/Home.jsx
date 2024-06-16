import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SiIfood } from "react-icons/si";
import Menu from '../../components/Menu/Menu'
import { api } from '../../utils/api';
import Card from '../../components/Card/Card';
import { getImage } from '../../utils/getImage';

const Home = () => {
  const [slide, setSlide] = useState(["./imgs/sorvetes.png"]);
  const [sorvetes, setSorvetes] = useState([])
  const [sabores, setSabores] = useState([])
  const [slice, setSlice] = useState(6)
  const [sorvete, setSorvete] = useState(slide[0])
  const [textFilter, setTextFilter] = useState('Todos')
  const [filters, setFilters] = useState(['Todos', 'Sorvete de massa', 'Picolé'])

  useEffect(() =>{
    async function getSorvetes() {
      api.get('sorvete-padrao')
      .then((response) =>{
        const sorvete_padrao = response.data.map((item) =>{ return {...item, filter: 'picolé'}})
        setSorvetes([...sorvetes, ...sorvete_padrao])
        setSlide([...slide, ...(response.data.slice(0, 3).map((item) => item.imagem))])
      })
      .catch((e) => console.log(e))
      api.get('sabor-sorvete')
      .then((response) => {
        const sabores_sorvete = response.data.map((item) =>{ return {...item, filter: 'sabor'}})
        setSabores([...sabores, ...sabores_sorvete])
        console.log(response.data);
      })
      .catch((e) => console.log(e))
    }
    getSorvetes()
  },[])

  useEffect(() => {
    const changeSorvete = setInterval(() => {
      const index = slide.indexOf(sorvete)
      const next = index + 1 === slide.length ? 0 : index + 1
      setSorvete(slide[next])
    }, 5000)
    return () => clearInterval(changeSorvete);
  })

  return (
    <>
      <Menu/>
      <main className={styles.main}>
        <section className={styles.section_title}>
          <h1 className={styles.title}>A melhor Sorveteria do seu bairro!</h1>
          <a href="#produtos">
            <MdOutlineKeyboardArrowDown className={styles.arrow_down} size={40} color='#fff'/>
          </a>
        </section>
        <aside className={styles.select_sorvete}>
          <div className={styles.imgs_sorvetes_selects_main}>
            <img src={getImage(sorvete)} alt="sorvete misterioso" className={styles.img_sorvete_selected}/>
            <a href="#aplicativo" className={styles.btnMonteSorvete}>Monte o seu sorvete</a>
          </div>
          <div className={styles.imgs_sorvetes_selects}>
            {
              slide?.slice(0,4).map((foto, index) => {
                return <img src={getImage(foto)} className={foto === sorvete ? styles.sorvete_selected : styles.sorvete_select} key={index} onClick={() => setSorvete(foto)}/>
              })
            }
          </div>
        </aside>
      </main>
      <img src="./imgs/blue_waves.svg" alt="blue waves" id='produtos'/>
      <section className={styles.view_sorvetes} >
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
          {
            [...new Set([...sorvetes, ...sabores])]
            .slice(0, slice).filter((sorvete) => {
              if(textFilter === 'Todos'){
                return sorvete
              }else if(textFilter === 'Sorvete de massa'){
                return sorvete.filter === 'sabor'
              }else if(textFilter === 'Picolé'){
                return sorvete.filter === 'picolé'
              }
            })
            .map((sorvete) => <Card sorvete={sorvete} key={sorvete._id}/>)
          }
        </div>
        <p className={styles.text_more} 
        onClick={() => setSlice(slice === 6 ? Infinity : 6)}>Ver {slice === 6 ? 'Mais +' : 'Menos -'}</p>
      </section>
      <section
      className={styles.section_app} id='aplicativo'>
        <aside>
          <div className={styles.ball_app}>
            <img src="./imgs/celular.png" alt="app QGelado" className={styles.cell_app}/>
          </div>
        </aside>
        <div className={styles.download_app}>
          <h3 className={styles.title_app}>Baixe o aplicativo</h3>
          <p className={styles.text_app}>Monte seu próprio sorvete e faça seu pedido!</p>
          <img src="./imgs/qrcode.png" alt="QR CODE App QGelado" className={styles.qrcode_app}/>
        </div>
      </section>
      <img src="./imgs/pink_waves.svg" alt="pink waves" />
      <section className={styles.contato} id='contato'>
        <img src="./imgs/logo_qgelado.svg" alt="Logo QGelado" className={styles.contato_logo}/>
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