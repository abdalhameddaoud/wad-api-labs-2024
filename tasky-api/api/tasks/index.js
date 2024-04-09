import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt; // Initially, created_at and updated_at are the same
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: createdAt,
        updated_at: updatedAt
    };
    tasksData.tasks.push(newTask);
    tasksData.total_results++;
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }


    const updatedTask = { ...tasksData.tasks[taskIndex], ...req.body, id:id };
    updatedTask.updated_at = new Date().toISOString(); // Update the updated_at property

    tasksData.tasks[taskIndex] = updatedTask;
    
    res.json(updatedTask);

   
});


//Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({status:404,message:'Task not found'});
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});

export default router;