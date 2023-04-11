import  ErrorHandler  from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {

    const { title, description } = req.body;


    await Task.create({
        title,
        description,
        user: req.user,
    });


    res.status(201).json({
        success: true,
        message: "Task added Successfully",
    });

};

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({ user: userid });
    
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        task.isCompleted = !task.isCompleted;
        task.save();
    
        if (!task) return next(new ErrorHandler("Invalid user_id",404)); 
    
        res.status(200).json({
            success: true,
            message: "Task updated!",
        });
    } catch (error) {
       next(error); 
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) return next(new ErrorHandler("Invalid user_id",404)); 
        
        await task.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Task deleted!",
        });
    } catch (error) {
        next(user);
    }

};
