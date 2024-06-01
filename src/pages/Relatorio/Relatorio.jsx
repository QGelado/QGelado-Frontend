import { useState, useEffect } from 'react'
import './style.css'
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import Axios from 'axios';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from './dataReport';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWUyNjRiMjc0NjQ2OTdhOTRhODkzNSIsImVtYWlsIjoiZ2loNDUwMEBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNjIyMjQsImV4cCI6MTcxNzM0ODYyNH0.fbo7T1e6E2A3dK-qjqVZ7jFA493b70YsWmEP4eryCwI";

const Relatorio = () => {
    const [qtdUsuarios, setQtdUsuarios] = useState(0);
    const [valorTotalSorvetes, setValorTotalSorvetes] = useState(0);
    const [valorTotalVendas, setValorTotalVendas] = useState(0);
    const [nomesSorvetesMaisVendidos, setNomeSorvetesMaisVendidos] = useState([]);
    const [nomesUsuariosVendidos, setNomesUsuariosVendidos] = useState([]);
    const [qtdSorvetesmensais, setQtdSorvetesMensais] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3000/pedidos/valor-por-meses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                const dataComMeses = data;
                let objOriginal = response.data;
                dataComMeses.forEach((j, i) => {
                    objOriginal.forEach(e => {
                        if (i + 1 == e._id.month) {
                            j.valor = e.totalValor.$numberDecimal
                        }
                    })
                })
                console.log(dataComMeses)

                setQtdSorvetesMensais(dataComMeses)
            })
            .catch((error) => {
                console.log(error)
                setQtdSorvetesMensais([])
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/pedidos/sorvetes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response.data)
                setNomeSorvetesMaisVendidos(response.data.filter((e, i) => i <= 3))
            })
            .catch((error) => {
                console.log(error)
                setNomeSorvetesMaisVendidos(0)
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/pedidos/valor-total`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setValorTotalVendas(parseFloat(response.data[0].totalValor.$numberDecimal))
            })
            .catch((error) => {
                console.log(error)
                setValorTotalVendas(0)
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/pedidos/sorvetes-valor-total`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setValorTotalSorvetes(parseFloat(response.data[0].totalValor.$numberDecimal))
            })
            .catch((error) => {
                console.log(error)
                setValorTotalSorvetes(0)
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/pedidos/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                const data_filtrada = response.data.filter((e, i) => i < 4)
                setNomesUsuariosVendidos(data_filtrada)
            })
            .catch((error) => {
                console.log(error)
                setNomesUsuariosVendidos([])
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3000/usuario/quantidadeCadastrados`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'>
                        {qtdSorvetesmensais.length != 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={qtdSorvetesmensais}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="valor" stroke="#FF90C8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : null}
                    </div>
                </section>

                <section className='relatorio__sorvetesMaisVendidos__container'>
                    <h2 className='relatorio__title__section'>Sorvetes mais vendidos</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big  relatorio__backgroundData--block'>
                        {nomesSorvetesMaisVendidos.map((e, i) => (
                            <div key={i} style={{ width: "100%", display: "flex", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <p style={{ textAlign: 'left', width: "250px" }} className='relatorio__backgroundData__text--medium'>{e.nome}</p>
                                <p className='relatorio__backgroundData__text--medium'>{e.count}</p>
                            </div>
                        )
                        )}
                    </div>
                </section>

                <section className='relatorio__valorTotalVendas__container'>
                    <h2 className='relatorio__title__section'>Valor total de vendas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--medium'>
                        <p className='relatorio__backgroundData__text--bold'>R$ {valorTotalVendas}</p>
                    </div>
                </section>

                <section className='relatorio__vendasTotalSorvetes__container'>
                    <h2 className='relatorio__title__section'>Valor total sorvetes</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--medium'>
                        <p className='relatorio__backgroundData__text--bold'>R$ {valorTotalSorvetes}</p>
                    </div>
                </section>

                <section className='relatorio__usuariosComMaisVendas__container'>
                    <h2 className='relatorio__title__section'>Usuários com mais vendas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big relatorio__backgroundData--block'>
                        {nomesUsuariosVendidos.map((e, i) => (
                            <div key={i} style={{ width: "100%", display: "flex", justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <p style={{ textAlign: 'left', width: "250px" }} className='relatorio__backgroundData__text--medium'>{e.nome}</p>
                                <p className='relatorio__backgroundData__text--medium'>{e.count}</p>
                            </div>
                        )
                        )}
                    </div>
                </section>

                <section className='relatorio__numeroVisitas__relatorio'>
                    <h2 className='relatorio__title__section'>Numero de visitas</h2>
                    <div className='relatorio__backgroundData relatorio__backgroundData--big'>
                        <p className='relatorio__backgroundData__text--bold'>Usuários cadastrados</p>
                        <p className='relatorio__backgroundData__text--bold'>{qtdUsuarios}</p>
                    </div>
                </section>
            </section>
        </main>
    )

}

export default Relatorio;