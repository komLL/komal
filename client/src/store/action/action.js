import axios from "axios";
// import App from "../../Component/App";
import { TASK_BY_ID, TASK_CREATE, TASK_DELETE, TASK_EDIT, TASK_LIST } from "../type";



export const taskList=()=>async(dispatch)=>{
    const res= await axios.get("http://localhost:8000/api/list");
    // console.table(res.data)
    dispatch({
        type:TASK_LIST,
        payload:res.data
    });
};

export const taskCreate=(formData)=> async (dispatch)=>{
    const res= await axios.post("http://localhost:8000/api/create",formData);

        // dispatch(taskList());
    dispatch({
        type:TASK_CREATE,
        payload:res.data
     });
    };

export const taskByid=(id)=>async(dispatch)=>{
    const res=await axios.get(`http://localhost:8000/api/task/${id}`);
    dispatch({
        type:TASK_BY_ID,
        payload:res.data,
        id:id,
    });
};

export const taskEdit=(id,formData)=>async(dispatch)=>{
    const res=await axios.put(`http://localhost:8000/api/task/${id}`,formData);
    dispatch({
        type:TASK_EDIT,
        payload:res.data,
        id:id,
    })
}
export const taskDelete=(id)=>async(dispatch)=>{
    const res=await axios.delete(`http://localhost:8000/api/task/${id}`);
    dispatch({
        type:TASK_DELETE,
        payload:res.data,
        id:id,
    })
}