import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();        
const app = express();
const prisma = new PrismaClient();
app.use(cors(
    {origin: '*',
        allowedHeaders: ['Content-Type'],
        methods: ['GET', 'POST', 'PUT'],     
    }   
    
));

app.use(express.json());

//Routes to handle CRUD operations for tasks

//validation middleware to check input fields before post into db 
const validation = (req,res,next)=>{
    const{title,description,status,priority,dueDate} = req.body;
    if(typeof title === 'string' && typeof description === 'string' && typeof status === 'string' && typeof priority === 'string' && typeof dueDate === 'string') {
        return next();
    }
    return res.status(400).json({error: 'Invalid input types'});
}

//create task using post method
app.post('/tasks', validation, async (req, res) => {
    const { title, description, status, priority,dueDate } = req.body;
    const parseDueDate = new Date(dueDate);
    try{
        const newTask = await prisma.tasks.create({
            data: {
                title,
                description,
                status,
                priority,
                dueDate: parseDueDate
            }
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'An error occurred while creating the task.' });
    }
});

//get all tasks based on query parameters
app.get('/tasks', async (req, res) => {
    const { status, priority } = req.query;
    const filters = {};
    if (status) filters['status'] = status;
    if (priority) filters['priority'] = priority;
    try {
        const tasks = await prisma.tasks.findMany({
            where: filters,
            orderBy: { dueDate: 'asc' }
        });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    } 
});

//update task using put method
app.put('/tasks/:id', async (req, res) => { 
    const { id } = req.params;              
    const {  status, priority } = req.body;
    try {
        const updatedTask = await prisma.tasks.update({
            where: { id: Number(id) },
            data: {
                status,
                priority,
            }
        });
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
});

//get task insights

app.get("/tasks/insights", async (req, res) => {
    try {
        const dueTaskDate = new Date();
        const totalTasks = await prisma.tasks.count();

    const completed = await prisma.tasks.count({
      where: { status: "Done" },
    });

    const inProgress = await prisma.tasks.count({
      where: { status: "InProgress" },
    });

    const openTasks = await prisma.tasks.count({
      where: { status: "Open" },
    });

    const highPriority = await prisma.tasks.count({
      where: { priority: "High" },
    });

    const mediumPriority = await prisma.tasks.count({
      where: { priority: "Medium" },
    });

    const lowPriority = await prisma.tasks.count({
      where: { priority: "Low" },
    });

    const overdueTasks = await prisma.tasks.count({
      where: {
        dueDate: { lt: new Date(dueTaskDate.setHours(0, 0, 0, 0)) },
        status: { not: "Done" },
      },
    });

    const completionRate = totalTasks
      ? ((completed / totalTasks) * 100).toFixed(1)
      : 0;

        
        const fullDate = new Date(dueTaskDate.setHours(0, 0, 0, 0));
        const nextDate = new Date(dueTaskDate.setHours(23, 59, 59, 999));
        const totalTasksDueToday = await prisma.tasks.count({
            where: {
                dueDate: fullDate
            }
        });
        const totalTasksDueTomorrow = await prisma.tasks.count({
            where: {
                dueDate: nextDate
            }
        });
        const summary = `
      Based on the current database insights:
      You have a total of ${totalTasks} tasks.
      Out of these, ${completed} tasks are completed, ${inProgress} are in progress, and ${openTasks} are still open.
      ${overdueTasks > 0 ? `There are ${overdueTasks} overdue tasks that need immediate attention.` : `No overdue tasks, great job staying on track!`}
      Task priorities show ${highPriority} high, ${mediumPriority} medium, and ${lowPriority} low priority tasks.
      Overall, you're maintaining steady progress — keep focusing on the high-priority ones for better efficiency. Your task completion rate stands at ${completionRate}%. Tasks due today: ${totalTasksDueToday}, tasks due tomorrow: ${totalTasksDueTomorrow} be consistent.
    `.trim();

        res.json({ totalTasks, completed, inProgress, openTasks, highPriority, mediumPriority, lowPriority, overdueTasks, completionRate, totalTasksDueToday, totalTasksDueTomorrow, summary });
    } catch (error) {
        console.error('Error fetching task insights:', error);
        res.status(500).json({ error: 'An error occurred while fetching task insights.' });
    }
});
         
// app listen on port 3000

app.process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});