import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { create, edit, userData } from "../redux/features/userSlice"
import { Button, Space, Table, Tag } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import Column from "antd/lib/table/Column";
import '../styles/dashboard.css'
import EditForm from "../components/editform";
import { PlusOutlined } from "@ant-design/icons";
import CreateForm from "../components/createForm";

export default function Dashboard(){
    const [data,setData]=useState([])
    // const [edit,setEdit]=useState(false)
    const [editData,setEditData]=useState({})
    const dispatch = useDispatch();
    const state=useSelector(state=>state.user.edit)
    const createState=useSelector(state=>state.user.create)
    console.log(state)
    console.log(state)
   const user=useSelector(userData)
   const navigate=useNavigate()

   useEffect(()=>{

    async function fetchData(){
        if(user.user.token)

    
await fetch('http://localhost:3000/api/products',{
    method:'GET',
    headers:{
        "Content-Type":'application/json',
        authorization:`Bearer ${user.user.token}`
    }
})
.then(data=>data.json())
.then(data=>setData(data))
.catch(err=>console.log(err))
    }
    fetchData()
   },[user])
   useEffect(()=>{
    console.log(user)
    if(user.user===null){
navigate('/login')
    }
   },[user])


//    console.log(data)
    return (
        <div    className="dashboard">
              <Button style={{
                position:'fixed',
                top:'20px',
                left:'30px'
              }} onClick={()=>dispatch(create(true))} type="primary"><PlusOutlined />Create</Button>

{
    
          data.length>0?  <Table className="table__dash" dataSource={data} >
                 <Column
      title="Name"
      key="name"
      render={(_, record) => (
        <Space size="middle">
         {record.name}        </Space>
      )}
    /> 
    <Column
    title="description"
    key="description"
    render={(_, record) => (
      <Space size="middle">
        {record.description}
      </Space>
    )}
  /> 
  <Column
  title="Price"
  key="_i d"
  render={(_, record) => (
    <Space size="middle">
      {record.price}
    </Space>
  )}
/>
    <Column
      title="Count"
      key="_i d"
      render={(_, record) => (
        <Space size="middle">
      {record.count}
        </Space>
      )}
    />
     <Column
      title="Action"
      key="_id"
      render={(_, record) => (
        <Space size="small">
<Button type="primary" onClick={()=>{
    dispatch(edit(true))
    // dispatch(editData(record))
    console.log(record,"dataer")
    setEditData(record)

}}>Update</Button>
{/* <Button onClick={deleteFunc} danger type="primary">Delete</Button> */}
        </Space>
      )}
    />


            </Table>:<div style={{
              display:'grid',
              placeItems:'center'
            }}>

              No items Found create something
              <br/>
              <Button onClick={()=>dispatch(create(true))} type="primary"><PlusOutlined />Create</Button>
            </div>
    
 
}
{
    state&&(
       <EditForm {...editData} />
    )
    
}
{
  createState&&(
    <CreateForm/>
  )
}
        </div>
    )
}