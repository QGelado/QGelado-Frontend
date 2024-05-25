import { useState, useEffect } from 'react'
import './style.css'
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import Axios from 'axios';

const Relatorio = () => {
    const [qtdUsuarios, setQtdUsuarios] = useState(0);

    useEffect(() => {
        Axios.get(`http://localhost:3000/usuario/quantidadeCadastrados`, {
            headers: {
                Authorization: `Bearer`,
            }
        })
        .then((response) => {
            setQtdUsuarios(response.data)
        })
        .catch((error) => {
            console.log(error)
            setQtdUsuarios(0)
        })
    }, [])

    return (
        <main className='relatorio__main'>
            <MenuLateral selecao="relatorio" adminName="Wilson Vendramel" />

            <section className='container__relatorio'>
                <section className='relatorio__vendasMensais__container'>
                    <h2 className='relatorio__title__section'>Alcance mensal de vendas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'></div>
                </section>

                <section className='relatorio__sorvetesMaisVendidos__container'>
                    <h2 className='relatorio__title__section'>Sorvetes mais vendidos</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'></div>
                </section>

                <section className='relatorio__valorTotalVendas__container'>
                    <h2 className='relatorio__title__section'>Valor total de vendas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--medium'></div>
                </section>

                <section className='relatorio__vendasTotalSorvetes__container'>
                    <h2 className='relatorio__title__section'>Valor total sorvetes</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--medium'></div>
                </section>

                <section className='relatorio__usuariosComMaisVendas__container'>
                    <h2 className='relatorio__title__section'>Usuários com mais vendas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'></div>
                </section>

                <section className='relatorio__numeroVisitas__relatorio'>
                    <h2 className='relatorio__title__section'>Numero de visitas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'>
                        <p>Usuários cadastrados</p>
                        <p>{qtdUsuarios}</p>
                    </div>
                </section>
            </section>
        </main>
    )

}

export default Relatorio;