import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Card, CardActions, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Api from '../api/Api'

import { employeeDatas } from '../data/Data'
import { GetEmployee, Employee, EmployeeData } from '../data/Employee'


function ListElmement(index: number, header: string, text: string) {
  return (
    <div>
      <div style={{ height: '0.5px', padding: '0px', backgroundColor: 'gray'}} />
      {/* <div style={{flex: 1, display: 'inline-block'}}>{header}</div>
      <div style={{flex: 1, display: 'inline-flex'}}>{text}</div> */}
      <ListItem key={index} disablePadding>
        <ListItemText primary={header} 
          style={{
            minWidth: '250px', 
            maxWidth: '250px',
            padding: '24px',
          }}
        />
        <ListItemText 
          primary={
            <div style={{ 
              height: '80px', 
              width: '1px', 
              backgroundColor: 'gray', 
              marginTop: '-15px',
              marginBottom: '-15px'
            }} />
          } 
          style={{maxWidth: '50px'}}
        />
        {/* <Divider orientation='vertical' flexItem style={{height: '50px', padding: '0px'}}/> */}
        <ListItemText primary={text} style={{width: '200px', paddingLeft: '0%'}}/>
      </ListItem>
    </div>
    
  )
}

function ProfileWall(employee: Employee, attrition: number) {
  const imgstyle = { maxHeight: '300px' }
  const color = attrition == 0 ? 'green' : 'red'
  const chipColor = attrition == 1 ? 'error' : 'success'
  const note = attrition == 1 ? '* Note: this staff can quit the job in future' : '* Note: a good staff'
  const image = employee.Gender === 'Male' ? 
    <img src='https://cdn-icons-png.flaticon.com/512/147/147142.png' style={imgstyle}/>
    : <img src='https://icon-library.com/images/avatar-icon/avatar-icon-8.jpg' style={imgstyle}/>

  return (
    <div>
      <Card sx={{padding: 5, minHeight: 300, minWidth: 300 }} >
        <div style={{display: 'inline-block', paddingRight: '25px'}}>
          {image}
        </div>
        <div style={{display: 'inline-block', minWidth: 500, verticalAlign: 'top', paddingLeft: '20px'}}>
          <CardContent>
            <Typography variant='h3' color={color} component='div'>
              {employee.name}
            </Typography>
            <br />
            <Typography variant='h5' component='div'>
              {employee.Department}'s staff
            </Typography>
            <br />
            <br />
            <div style={{minWidth: 300, paddingTop: '100px', float: 'right'}}>
              <Chip label={`Attrition's status`} color={chipColor}  style={{ width: 300, fontSize: "1.2rem" }}/>
            </div>
          </CardContent>
        </div>
      </Card>
      <div style={{color: color}}>{note}</div>
    </div>
  )
}

export default function Detail(props: any) {
  const params = useParams()

  let employee: EmployeeData | any
  if (params.id !== undefined) {
    const id: number = +params.id
    employee = GetEmployee(id)
  } else {
    throw Error()
  }

  const [attrition, setAttrition] = useState(0)
  //const [profile, setProfile] = useState(ProfileWall(employee, attrition))

  async function fetchData() {
    const response = await Api.get('', employee)
    //console.log(response.Attrition)
    setAttrition(response.Attrition)
    //setProfile(ProfileWall(employee, attrition))
  }

  useEffect(() => {
    fetchData()
  })
  
  return (
    <div style={{paddingLeft: '280px', paddingRight: '280px', paddingTop: '100px', paddingBottom: '250px'}}>
      {ProfileWall(employee, attrition)}
      <div style={{paddingTop: '20px'}}>
        <div style={{
          backgroundColor: 'rgb(12, 158, 255)',
          color: 'white'
        }}>
          {ListElmement(0, 'Properties', 'Value')}
        </div>
        {Object.keys(employee).map(function(key: string, index: number) {
          if (key === 'name' || key === 'id') {
            return <></>
          }
          return ListElmement(index, key, employee[key])
        })}
      </div>
      
      <div style={{ height: '0.5px', backgroundColor: 'gray'}} />
    </div>
  )
}