import React from 'react'
import styles from './cadastroprodutos.module.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaImage } from "react-icons/fa6";

const CadastroProdutos = () => {
    const searchParams = new URLSearchParams(useLocation().search)
    const type = searchParams.get('type')
    const [fields] = useState(
        type === 'sabor-sorvete' ? ['nome', 'sabor', 'quantidade', 'preco', 'imagem']
        : type === 'recipiente' || type === 'acompanhamento' ? ['nome', 'tipo', 'quantidade', 'preco', 'imagem']
        : type === 'sorvete-padrao' ? ['nome',  'marca', 'preco', 'sabor', 'quantidade', 'descricao', 'imagem'] 
        : []
    )
    const [produto, setProduto] = useState(Object.fromEntries(Object.entries(Object.assign({}, fields)).map(item => {return [item[1], '']})))
    const name = type === 'sabor-sorvete' ? 'Sabor de sorvete'
    : type === 'recipiente' ? 'Recipiente' 
    : type === 'acompanhamento' ? 'Acompanhamento'
    : type === 'sorvete-padrao' ? 'Sorvete padrão' 
    : []
    console.log(produto);

    const changeProduct = (value, prop) =>{
        setProduto({...produto, [prop]: value})
    }
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Cadastrar {name}</h1>
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
                                <input type="file" value={produto[field]} id={field} onChange={(e) => changeProduct(e.target.value, field)} style={{display:'none'}}/>
                                <label htmlFor={field}>
                                    {produto.imagem  ? 
                                        <img src={URL.createObjectURL(produto.imagem)} className={styles.imgInputProduct}/>
                                    :
                                        <div className={styles.imgInputProduct}>
                                            <FaImage color='#197CFF'/>
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

export default CadastroProdutos