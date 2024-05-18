import React, { useMemo } from 'react'
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

const data = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        status: <p style={{backgroundColor: "#EBF9F1", width: 130,textAlign: "center", padding: 3,borderRadius: 20, color: "#1F9254"}}>Em Estoque</p>,
        city: 'East Daphne',
        tipo: "Padrão",
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        status: <p style={{backgroundColor: "#EBF9F1",width: 130, textAlign: "center", padding: 3,borderRadius: 20, color: "#1F9254"}}>Em Estoque</p>,
        tipo: "Padrão",
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        status: <p style={{backgroundColor: "#EBF9F1", width: 130,textAlign: "center", padding: 3,borderRadius: 20, color: "#1F9254"}}>Em Estoque</p>,
        tipo: "Padrão",

    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        status: <p style={{backgroundColor: "#FBE7E8",width: 130,textAlign: "center", padding: 3,borderRadius: 20, color: "#A30D11"}}>Fora de estoque</p>,
        tipo: "Personalizado",

    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        status: <p style={{backgroundColor: "#FBE7E8",width: 130,textAlign: "center", padding: 3,borderRadius: 20, color: "#A30D11"}}>Fora de estoque</p>,
        tipo: "Personalizado",
    
    },
];


const Estoque = () => {

    const theme = useTheme();

    const baseBackgroundColor =
    theme.palette.mode !== 'dark'
      ? '#FFFFFF'
      : 'rgb(235, 239, 242)';

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName',
                header: 'ID',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'Nome do produto',
                size: 150,
            },
            {
                accessorKey: 'address',
                header: 'Preço',
                size: 200,
            },
            {
                accessorKey: 'city',
                header: 'Quantidade',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'tipo',
                header: 'Tipo',
                size: 150,
            },
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

    return (
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
    )
}

export default Estoque;