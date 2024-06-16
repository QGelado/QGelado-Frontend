import React, { useMemo, useEffect, useState } from 'react'
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css'
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import { darken, lighten, useTheme } from '@mui/material';
import Axios from 'axios';
import { api } from '../../utils/api';

const token = window.localStorage.getItem('qJwt')

const Pedidos = () => {
    const [popupConfirmar, setPopupConfirmar] = useState(false);
    const [data, setData] = useState([]);
    const [mensagemConfimacao, setMensagemConfimacao] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [idPedido, setIdPedido] = useState("");
    const [sorvete, setSorvete] = useState([]);
    const [preco, setPreco] = useState(0);

    function retornaDadosPedidos() {
        api.get(`pedidos/busca?limite=100`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error:\n" + error)
                setData([]);
            })
    }

    function atualizaStatus(id) {
        api.put(`pedidos/${id}`, {
            "status": "Finalizado"
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response.data)
                retornaDadosPedidos();
            })
            .catch((error) => {
                console.log("Error:\n" + error)
            })
    }

    useEffect(() => {
        retornaDadosPedidos()
    }, [])

    useEffect(() => {
        if (!popupConfirmar && mensagemConfimacao) {
            setTimeout(() => {
                setMensagemConfimacao(e => !e)
            }, 5000);
        }
    }, [popupConfirmar])

    const theme = useTheme();

    const baseBackgroundColor =
        theme.palette.mode !== 'dark'
            ? '#FFFFFF'
            : 'rgb(235, 239, 242)';

    const columns = useMemo(
        () => [
            {
                accessorKey: 'codigo',
                header: 'ID',
                size: 150,
            },
            {
                accessorKey: 'data',
                header: 'Data do Pedido',
                size: 150,
            },
            {
                accessorKey: 'preco.$numberDecimal',
                header: 'Preço',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            }
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: "#C3EFFF",
                fontFamily: "Poppins",
                height: 60,
                verticalAlign: "middle"
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontFamily: "Poppins",
                padding: '100',
            },
        },
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                <IconButton onClick={() => {
                    console.info(row.original);
                    setPopupConfirmar(e => !e);
                    setNomeUsuario(row.original.usuario.nome);
                    setIdPedido(row.original._id);
                    setPreco(row.original.preco.$numberDecimal);
                    setSorvete(row.original.sorvetes);
                }}>
                    <VisibilityIcon />
                </IconButton>
            </Box>
        ),
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Visualizar',
            },
        },
        muiTableBodyProps: {
            sx: (theme) => ({
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
                {
                    backgroundColor: darken(baseBackgroundColor, 0.1),
                },
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                {
                    backgroundColor: darken(baseBackgroundColor, 0.2),
                },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
                {
                    backgroundColor: lighten(baseBackgroundColor, 0.1),
                },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                {
                    backgroundColor: darken(baseBackgroundColor, 0.2),
                },
            }),
        },
        mrtTheme: (theme) => ({
            baseBackgroundColor: baseBackgroundColor,
            draggingBorderColor: theme.palette.secondary.main,
        }),
        //   enableTopToolbar: false,

    });


    return (
        <main className='pedidos__main'>
            <MenuLateral selecao="pedidos" adminName="Wilson Vendramel" />
            <section className="container__table">
                <div className='table__title table__title--relative'>
                    <p>Pedidos</p>
                    <div className='pedido__confirmado__positivo' style={mensagemConfimacao == true ? { display: 'flex' } : { display: 'none' }}>
                        <CheckIcon style={{ color: '#1F9254' }} />
                        <p>Pedido confirmado</p>
                    </div>
                </div>
                <div className='table__data'>
                    {data.length > 0 ? (<MaterialReactTable table={table} />) : null}
                </div>
            </section>

            {popupConfirmar == true ? (
                <div className='all__page__container'>
                    <div className='confirma__pedido__container'>
                        <div className='title__container'>
                            <p>{nomeUsuario}</p>
                            <p>#{idPedido}</p>
                        </div>
                        <div className='pedidos__list__container__main'>
                            <div className='pedidos__list__container'>
                                <div className='pedidos__list__column__item'>
                                    <p className='pedidos__list__column__title'>Item</p>
                                    {sorvete.map((e, i) => (
                                        <p key={i}>{e.nome}</p>
                                    ))}
                                </div>
                                <div className='pedidos__list__column__qtd'>
                                    <p className='pedidos__list__column__title'>QTD</p>
                                    {sorvete.map((e, i) => (
                                        <p key={i}>1</p>
                                    ))}
                                </div>
                                <div className='pedidos__list__column__preco'>
                                    <p className='pedidos__list__column__title'>Preço</p>
                                    {sorvete.map((e, i) => (
                                        <p key={i}>{e.preco}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='pedidos__list__container'>
                                <div className='pedidos__list__column__item'>
                                    <p className='pedidos__list__column__title'>Total</p>
                                </div>
                                <div className='pedidos__list__column__qtd'>
                                    <p className='pedidos__list__column__title'>{sorvete.length}</p>
                                </div>
                                <div className='pedidos__list__column__preco'>
                                    <p className='pedidos__list__column__title'>R$ {preco}</p>
                                </div>
                            </div>

                        </div>
                        <div className='buttons__container'>
                            <button className='botoes__botaoDeletar' onClick={() => { setPopupConfirmar(e => !e) }}>Cancelar</button>
                            <button className='botoes__botaoSalvar' onClick={() => { setPopupConfirmar(e => !e);setMensagemConfimacao(e => !e);atualizaStatus(idPedido) }} >Confirmar</button>
                        </div>
                    </div>
                </div>
            ) : null}

        </main>
    )
}


export default Pedidos;

