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

const TOKEN = window.localStorage.getItem('qJwt')


const Estoque = () => {
  const [data, setData] = useState([]);

  function retornaSorvetesPadroes() {
    Axios.get(`http://localhost:3000/sorvete-padrao`)
      .then((response) => {
        let obj = response.data[0];
        obj['tipoProduto'] = "sorvete-padrao"
        setData(e => [...e, obj]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaAcompanhamento() {
    Axios.get(`http://localhost:3000/acompanhamento`)
      .then((response) => {
        let obj = response.data[0];
        obj['tipoProduto'] = "acompanhamento"
        setData(e => [...e, obj]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaSaborSorvete() {
    Axios.get(`http://localhost:3000/sabor-sorvete`)
      .then((response) => {
        let obj = response.data[0];
        obj['tipoProduto'] = "sabor-sorvete"
        setData(e => [...e, obj]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
  }

  function retornaRecepiente() {
    Axios.get(`http://localhost:3000/recipiente`)
      .then((response) => {
        let obj = response.data[0];
        obj['tipoProduto'] = "recipiente"
        setData(e => [...e, obj]);
      })
      .catch((error) => {
        console.log("Error:\n" + error)
      })
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
        <IconButton onClick={() => console.info(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.info(row)}>
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