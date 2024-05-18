import React from 'react'
import styles from './cadastroprodutos.module.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaImage } from "react-icons/fa6";
import axios from 'axios';
import { api } from '../../utils/api';

const CadastroProdutos = () => {
    const searchParams = new URLSearchParams(useLocation().search)
    const type = searchParams.get('type')
    const token = window.localStorage.getItem('token')
    const [fields] = useState(
        type === 'sabor-sorvete' ? ['nome', 'sabor', 'quantidade', 'preco', 'file']
        : type === 'recipiente' || type === 'acompanhamento' ? ['nome', 'tipo', 'quantidade', 'preco', 'file']
        : type === 'sorvete-padrao' ? ['nome',  'marca', 'preco', 'sabor', 'quantidade', 'descricao', 'file'] 
        : []
    )
    const [produto, setProduto] = useState(Object.fromEntries(Object.entries(Object.assign({}, fields)).map(item => {return [item[1], '']})))
    const name = type === 'sabor-sorvete' ? 'Sabor de sorvete'
    : type === 'recipiente' ? 'Recipiente' 
    : type === 'acompanhamento' ? 'Acompanhamento'
    : type === 'sorvete-padrao' ? 'Sorvete padrão' 
    : []
    
    const changeProduct = (value, prop) =>{
        setProduto({...produto, [prop]: value})
    }
    const createProduct = (e) =>{
        e.preventDefault()
        if(Object.keys(produto).every(product => produto[product] !== '')){
            console.log(produto);
            const formData = new FormData()
            Object.keys(produto).forEach(element => {
                formData.append(element, produto[element])
            });
            api.post(type, formData, {
                headers: {
                    'Authorization': 'Bearer '+ token,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) =>{
                console.error(error);
            })
        }
    }
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Cadastrar {name}</h1>
        <form className={styles.form} onSubmit={createProduct}>
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
                    if(field === 'file'){
                        return (
                            <div className={styles.boxInput} key={field}>
                                <label htmlFor={field} className={styles.label}>Imagem</label>  
                                <input type="file" id={field} onChange={(e) => changeProduct(e.target.files[0], field)} style={{display:'none'}}/>
                                <label htmlFor={field} style={{overflowY:'auto'}}>
                                    {produto.file  ? 
                                        <img src={URL.createObjectURL(produto.file)} className={styles.imgProduct}/>
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
            <button className={styles.btnSalvar} type='submit'>Salvar</button>
        </form>
    </div>
  )
}

export default CadastroProdutos