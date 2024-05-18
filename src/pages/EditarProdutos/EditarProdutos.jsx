import React, { useEffect } from 'react'
import styles from './editarprodutos.module.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaImage } from "react-icons/fa6";
import { RiImageEditFill } from "react-icons/ri";
import { api } from '../../utils/api';
import { getImage } from '../../utils/getImage';

const EditarProdutos = () => {
    const searchParams = new URLSearchParams(useLocation().search)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const token = window.localStorage.getItem('token')
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
        api.get(`${type}/${id}`)
        .then((response) => {
            console.log(response.data);
            setProduto(response.data)
        })
        .catch((error) => {
            console.error(error);
        })
    }, [])
    
    const changeProduct = (value, prop) =>{
        setProduto({...produto, [prop]: value})
    }

    const editProduct = (e) =>{
        e.preventDefault()
        if(Object.keys(produto).every(product => produto[product] !== '')){
            console.log(produto);
            const formData = new FormData()
            Object.keys(produto).forEach(element => {
                if(element === 'imagem' && typeof produto.imagem === 'object'){
                    formData.append('file', produto[element])
                }else{
                    formData.append(element, produto[element])
                }
            });
            for(const [key, value] of formData){
                console.log(key, value);
            }
            api.put(`${type}/${id}`, formData, {
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
        <h1 className={styles.title}>Editar {name}</h1>
        <form className={styles.form} onSubmit={editProduct}>
            {
                fields.map((field) => {
                    if(field === 'descricao'){
                        return (<div className={styles.boxInput} key={field}>
                            <label htmlFor={field} className={styles.label}>Descrição</label>  
                            <textarea name={field} id={field} cols="30" rows="10" onChange={(e) => changeProduct(e.target.value, field)} className={styles.textarea} value={produto.descricao}></textarea>
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
                                <input type="file" id={field} onChange={(e) => { changeProduct(e.target.files[0], field)}} style={{display:'none'}}/>
                                <label htmlFor={field} style={{overflowY:'auto'}}>
                                    {produto.imagem  ? 
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <img src={getImage(produto.imagem)} className={styles.imgProduct}/>
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
            <button className={styles.btnSalvar} type="submit">Salvar</button>
        </form>
    </div>
  )
}

export default EditarProdutos