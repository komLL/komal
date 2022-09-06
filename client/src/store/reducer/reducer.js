import { TASK_BY_ID, TASK_CREATE, TASK_DELETE, TASK_EDIT, TASK_LIST } from "../type";


const initialValue={
    tasks:[],
    task:{},
    loading:true,
}

const taskReducer=(state=initialValue,action)=>{
switch(action.type){
case TASK_CREATE:{
      return { ...state, tasks: [...state.tasks, action.payload] };
}
case TASK_LIST:{
    return{
    ...state,
    tasks:action.payload,
    loading:false,
    }
}
case TASK_BY_ID:{
    return{
        ...state, task: action.payload, loading: false
    }
}
case TASK_EDIT:
      const editTask = state.tasks.map((item) => {
        return item._id === action.id ? { item, ...action.payload } : item;
      });

      return {
        ...state,
        tasks: editTask,
        loading: false,
      };
case TASK_DELETE:
     let taskDelete=state.tasks.filter((item)=>
        item._id!==action.id
);
    return{
        ...state,
        tasks:taskDelete,
        loading:false
    }

default: return state;
}
}


export default taskReducer;