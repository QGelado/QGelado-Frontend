import React, { useEffect } from 'react'
import styles from './editarprodutos.module.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { RiImageEditFill } from "react-icons/ri";

const EditarProdutos = () => {
    const searchParams = new URLSearchParams(useLocation().search)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const [fields] = useState(
        type === 'sabor-sorvete' ? ['imagem', 'nome', 'sabor', 'quantidade', 'preco']
        : type === 'recipiente' || type === 'acompanhamento' ? ['imagem', 'nome', 'tipo', 'quantidade', 'preco']
        : type === 'sorvete-padrao' ? ['imagem', 'nome',  'marca', 'preco', 'sabor', 'quantidade', 'descricao'] 
        : []
    )
    const [produto, setProduto] = useState(Object.fromEntries(Object.entries(Object.assign({}, fields)).map(item => {return [item[1], '']})))
    const name = type === 'sabor-sorvete' ? 'Sabor de sorvete'
    : type === 'recipiente' ? 'Recipiente' 
    : type === 'acompanhamento' ? 'Acompanhamento'
    : type === 'sorvete-padrao' ? 'Sorvete padrão' 
    : []

    useEffect(() =>{

    }, [])
    
    const changeProduct = (value, prop) =>{
        setProduto({...produto, [prop]: value})
        console.log(produto);
    }
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Editar {name}{id}</h1>
        <form className={styles.form}>
            {
                fields.map((field) => {
                    if(field === 'descricao'){
                        return (<div className={styles.boxInput} key={field}>
                            <label htmlFor={field} className={styles.label}>Descrição</label>  
                            <textarea name={field} id={field} cols="30" rows="10" onChange={(e) => changeProduct(e.target.value, field)} className={styles.textarea}>{produto[field]}</textarea>
                        </div>)
                    }
                    if(field === 'preco'){
                        return null
                    }
                    if(field === 'quantidade'){
                        return (
                            <div className={styles.boxInputs} key={field}>
                                <div className={styles.boxInput}>
                                  <label htmlFor={field} className={styles.label}>{field}</label>  
                                  <input type="text" value={produto[field]} id={field} onChange={(e) => changeProduct(e.target.value, field)} className={styles.input}/>
                                </div>
                                <div className={styles.boxInput}>
                                  <label htmlFor={'preco'} className={styles.label}>Preço</label>  
                                  <input type="number" value={produto['preco']} id={'preco'} onChange={(e) => changeProduct(e.target.value, 'preco')} className={styles.input}/>
                                </div>
                            </div>
                        )
                    }
                    if(field === 'imagem'){
                        return (
                            <div className={styles.boxInput} key={field}>
                                <label htmlFor={field} className={styles.label}>{field}</label>  
                                <input type="file" id={field} onChange={(e) => changeProduct(e.target.files[0], field)} style={{display:'none'}}/>
                                <label htmlFor={field} style={{overflowY:'auto'}}>
                                    {produto.imagem  ? 
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <img src={URL.createObjectURL(produto.imagem)} className={styles.imgProduct}/>
                                        <RiImageEditFill color='#FF40A0' size={30} className={styles.imgIconProduct}/>
                                    </div>
                                    :
                                        <div className={styles.imgInputProduct}>
                                            <FaImage color='#30c8ff' size={50}/>
                                        </div>
                                    }
                                </label> 
                            </div>
                        )
                    }
                    return (
                        <div className={styles.boxInput} key={field}>
                            <label htmlFor={field} className={styles.label}>{field}</label>  
                            <input type="text" value={produto[field]} id={field} onChange={(e) => changeProduct(e.target.value, field)} className={styles.input}/>
                        </div>
                    )
                })
            }
            <button className={styles.btnSalvar}>Salvar</button>
        </form>
    </div>
  )
}

export default EditarProdutos