import React, { Fragment, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { taskByid, taskCreate, taskDelete, taskEdit, taskList } from '../store/action/action';

const Task = () => {
  const[name,setName]=React.useState("");
  const[email,setEmail]=React.useState("")
  const[introduction,setIntroduction]=React.useState("")
  const[showedit,setShowedit]=React.useState(false);
  const[editId,setEditId]=React.useState("");
  const usedispatch=useDispatch();
  const taskStore=useSelector((state)=>state.task);
  const {loading,tasks,task}=taskStore

  const handleSubmit=async()=>{
    const formData={name,email,introduction}
    await usedispatch(taskCreate(formData))
    // await usedispatch(taskList()); 
    setName("");
    setEmail("");
    setIntroduction("");
    // try{
    //   const res=await axios.post("http://localhost:8000/api/create",formData);
    //   setDescription("")
    //   setName("")
    // }
    // catch(error){console.log(error)}
    // console.log(name)
    // console.log(description)
    
  }
  const handleEditSubmit=()=>{
    const formData={name,email,introduction};
    usedispatch(taskEdit(editId,formData));
    setName("");
    setEmail("");
    setIntroduction("");
  }
  const handleEdit=async(item)=>{
    // console.log(item)
    // setDescription(item.description)
    // setName(item.name)
    usedispatch(taskByid(item._id))
    setShowedit(true);
    setEditId(item._id)
  }
  const handleDelete=(id)=>{
   usedispatch(taskDelete(id))
  }
  React.useEffect(() => {
    task.name && setName(task.name);
    task.email && setEmail(task.email);
    task.introduction && setIntroduction(task.introduction);
  }, [task]);
React.useEffect(()=>{
  usedispatch(taskList());
},[]);
  return (
    <div>
    <h1 style={{margin:10}}> Create task</h1>
    <input style={{height:30,margin:10}} value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="name"/><br/>
    <input style={{height:30,margin:10}} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email"/><br/>
    <input style={{height:30,margin:10}} value={introduction} onChange={(e)=>{setIntroduction(e.target.value)}} placeholder="introduction"/><br/>
    {showedit?<button style={{height:30,margin:10}} onClick={()=>handleEditSubmit()}>Edit</button>:
    <button style={{height:30,margin:10}} onClick={()=>handleSubmit()}>Create</button>}
    <h2> Task List </h2>
    {loading?(<h1> items is loading</h1>):(tasks.map((item)=>{
      return(
        <Fragment key={item._id}>
          <h4>{item.name}</h4>
          {item.email}&nbsp;
          {item.introduction}&nbsp;
          <button onClick={()=>handleEdit(item)}>Edit</button>&nbsp;
          <button onClick={()=>handleDelete(item._id)}>Delete</button>

        </Fragment>
      )
    }))}
    </div>
  )
}

export default Task;

