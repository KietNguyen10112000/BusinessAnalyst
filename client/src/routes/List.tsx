//import React from 'react'

import { useNavigate } from 'react-router-dom'

import './List.css'

import { employeeDatas, employeeNames } from '../data/Data'

/* import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card' */

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

import Api from '../api/Api'

import { Employee, EmployeeData } from '../data/Employee'

const employees: Employee[] = employeeDatas.map((value, index) => {
  const data = JSON.parse(value) as EmployeeData
  const employee = data as Employee
  employee.name = employeeNames[index]
  employee.id = index + 1
  return employee
})

const columns: GridColDef[] = [
  { field: 'id', headerName: '', width: 100, align: 'center' },
  { field: 'name', headerName: 'Name', flex: 1, headerClassName: 'header'  },
  { field: 'Gender', headerName: 'Gender', flex: 1, headerClassName: 'header'  },
  { field: 'Department', headerName: 'Department', flex: 1, headerClassName: 'header'  },
  { field: 'DistanceFromHome', headerName: 'Distance From Home (km)', flex: 1, headerClassName: 'header' },
  { field: 'MonthlyIncome', headerName: 'Monthly Income ($)', flex: 1, headerClassName: 'header' },
]

export default function List() {
  const navigate = useNavigate();
  const rows = employees
  return (
    <div className='table'>
      <Box sx={{ height: 630, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          //checkboxSelection
          disableSelectionOnClick
          onRowClick={ async (value) => {
            //console.log(value)
            //const response = await Api.get('', value.row)
            //console.log(response)
            navigate(`/detail/${value.row.id - 1}`)
          }}
        />
      </Box>
      {/* <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Age</TableCell>
              <TableCell align='right'>Gender&nbsp;</TableCell>
              <TableCell align='right'>Department&nbsp;</TableCell>
              <TableCell align='right'>Distance From Home&nbsp;(km)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.Age}</TableCell>
                <TableCell align='right'>{row.Gender}</TableCell>
                <TableCell align='right'>{row.Department}</TableCell>
                <TableCell align='right'>{row.DistanceFromHome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
    
  );
}