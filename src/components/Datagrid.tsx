import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
export interface User {
    address: Address
    id: number
    email: string
    username: string
    password: string
    name: Name
    phone: string
    __v: number
}

export interface Address {
    geolocation: Geolocation
    city: string
    street: string
    number: number
    zipcode: string
}

export interface Geolocation {
    lat: string
    long: string
}

export interface Name {
    firstname: string
    lastname: string
}

export const Datagrid = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then(res => {
                setUsers(res.data)
                console.log(res.data);

            })
    }, [])

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (row) => `${row.name.firstname }`,
        },
      ];
    const rows = users;


    return (
        <div><Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box></div>
    )
}
