const express=require("express");
const mongoose=require("mongoose");

var cors=require("cors");  
const app=express(); 
app.use(cors());

app.use(express.json());
app.listen(8000,()=>{
    console.log("your server is running 8000")
})
//express config
mongoose.connect('mongodb://localhost:27017/StudentTask');

/// model
const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
    },
    introduction:{
        type:String,
        trim:true,
    },
},
    {
     timestamps:true,
    }

);

const Task=mongoose.model("Task",taskSchema)
//post
app.post("/api/create",async(req,res)=>{
    try{
        const task=new Task({name:req.body.name, email:req.body.email,introduction:req.body.introduction,})
        await task.save();
        console.log(task)
        res.status(200).send(task);
    }
    catch(error){console.log(error)}
})
//get
app.get("/api/list",async(req,res)=>{
    try{
        const tasks=await Task.find();
        res.send(tasks);

    }
    catch(error){
        console.log(error)
    }
})
//get by id
app.get("/api/task/:id",async(req,res)=>{
    try{
        const task=await Task.findOne({_id:req.params.id})
        res.send(task)    
    }
    catch(error){
        console.log(error)
    }
})
//edit
app.put("/api/task/:id",async(req,res)=>{
    try{
        const task=await Task.findOne({_id:req.params.id})
        task.name=req.body.name;
        task.email=req.body.email;
        task.introduction=req.body.introduction;
        await task.save();
        res.send(task);
    }
    catch(error){console.log(error)

    }
})
//delete
app.delete("/api/task/:id",async(req,res)=>{
try{
    const task=await Task.findOneAndDelete({_id:req.params.id});
    res.send(task)

}
catch(error){
    console.log(error);
}
})