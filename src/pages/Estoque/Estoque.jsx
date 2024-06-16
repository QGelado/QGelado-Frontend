import React, { useMemo, useEffect, useState } from 'react'
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './style.css'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { darken, lighten, useTheme } from '@mui/material';
import Axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { api } from '../../utils/api';

const TOKEN = window.localStorage.getItem('qJwt')


const Estoque = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(null)

  function retornaSorvetesPadroes() {
    api.get(`sorvete-padrao`)
      .then((response) => {
        let objs = response.data;
        objs = objs.map((ob) => {
          return {
            ...ob,
            tipoProduto: "sorvete-padrao"
          }
        })
        setData(e => [...e, ...objs]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaAcompanhamento() {
    api.get(`acompanhamento`)
      .then((response) => {
        let objs = response.data;
        objs = objs.map((ob) => {
          return {
            ...ob,
            tipoProduto: "acompanhamento"
          }
        })
        setData(e => [...e, ...objs]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaSaborSorvete() {
    api.get(`sabor-sorvete`)
      .then((response) => {
        let objs = response.data;
        objs = objs.map((ob) => {
          return {
            ...ob,
            tipoProduto: "sabor-sorvete"
          }
        })
        setData(e => [...e, ...objs]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaRecepiente() {
    api.get(`recipiente`)
      .then((response) => {
        let objs = response.data;
        objs = objs.map((ob) => {
          return {
            ...ob,
            tipoProduto: "recipiente"
          }
        })
        setData(e => [...e, ...objs]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function deletaProduto(type, id) {

    if (type == "acompanhamento") {
      api.delete(`acompanhamento/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      })
        .then((response) => {
          console.log(response.data)
          retornaAcompanhamento();
          setModal(<Modal message="Produto deletado" />)
          setTimeout(() => {
            setModal(null)
          }, 2000)
        })
        .catch((error) => {
          console.log("Error:\n" + error)
        })
    } else if (type == "sabor-sorvete") {
      api.delete(`sabor-sorvete/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      })
        .then((response) => {
          console.log(response.data)
          retornaSaborSorvete();
          setModal(<Modal message="Produto deletado" />)
          setTimeout(() => {
            setModal(null)
          }, 2000)
        })
        .catch((error) => {
          console.log("Error:\n" + error)
        })
    } else if (type == "sorvete-padrao") {
      api.delete(`sorvete-padrao/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      })
        .then((response) => {
          console.log(response.data)
          retornaSorvetesPadroes();
          setModal(<Modal message="Produto deletado" />)
          setTimeout(() => {
            setModal(null)
          }, 2000)
        })
        .catch((error) => {
          console.log("Error:\n" + error)
        })
    } else if (type == "recipiente") {
      api.delete(`recipiente/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      })
        .then((response) => {
          console.log(response.data)
          retornaRecepiente();
          setModal(<Modal message="Produto deletado" />)
          setTimeout(() => {
            setModal(null)
          }, 2000)
        })
        .catch((error) => {
          console.log("Error:\n" + error)
        })
    }
  }



  useEffect(() => {
    retornaSaborSorvete()
    retornaAcompanhamento()
    retornaSorvetesPadroes()
    retornaRecepiente()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])


  const theme = useTheme();

  const baseBackgroundColor =
    theme.palette.mode !== 'dark'
      ? '#FFFFFF'
      : 'rgb(235, 239, 242)';

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'nome',
        header: 'Nome do produto',
        size: 150,
      },
      {
        accessorKey: 'tipoProduto',
        header: 'Tipo',
        size: 150,
      },
      {
        accessorKey: 'preco',
        header: 'Preço',
        size: 200,
      },
      {
        accessorKey: 'quantidade',
        header: 'Quantidade',
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
        <IconButton onClick={() => { navigate(`/editar-produto?type=${row.original.tipoProduto}&id=${row.original._id}`) }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => { deletaProduto(row.original.tipoProduto, row.original._id) }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Ações',
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

  return data.length > 0 ? (
    <main className='pedidos__main'>
      {modal}
      <MenuLateral selecao="estoque" adminName="Wilson Vendramel" />
      <section className="container__table">
        <div className='table__title'>
          <p>Estoque</p>
        </div>
        <div className='table__data'>
          <MaterialReactTable table={table} />
        </div>
      </section>
    </main>
  ) : null

}

export default Estoque;