import {  v4 as uuidv4 } from 'uuid'
import Task from '../models/taskModel.js'

export const getTask=async(req,res)=>{
    const id=req.params.id;
    
    try {
        const getTask=await Task.get(id);

        if(!getTask) return res.status(400).json(["Task not Found"])

        res.status(200).json(getTask);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getTasks=async(req,res)=>{
    const user=req.user.id;
    
    try {
        const taskResult=await Task.query("user").eq(user).using("user").exec();
        res.status(200).json(taskResult);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createTask=async(req,res)=>{
    const {title,description,date}=req.body;

    try {
        const newTask=new Task({
            id: uuidv4(),
            title,
            description,
            date,
            user:req.user.id
        })
        const savedTask=await newTask.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateTask=async(req,res)=>{
    const {title,description}=req.body;
    const id=req.params.id;
    try {
        const getTask=await Task.get(id);

        if(getTask){
            const updateTask=await Task.update({"id":id},{"title":title,"description":description});
            res.json(updateTask);
        }else{
            return res.status(400).json(["Task not Found"])
        }
 

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteTask=async(req,res)=>{
    
    const id=req.params.id;

    try {

        await Task.delete({"id":id});

        res.json(["Task successfull deleted"]);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

