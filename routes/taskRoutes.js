import {Router} from 'express'
import {authRequired} from '../middlewares/valdateToken.js'
import {getTask,getTasks,createTask,updateTask,deleteTask} from '../controllers/task.controller.js'
import { validateSchema } from '../middlewares/validator.middlewares.js';
import { createTaskSchema } from '../schemas/task.Schema.js';

const router=Router();

router.get('/tasks',authRequired,getTasks);

router.get('/tasks/:id',authRequired,getTask);

router.post('/tasks',authRequired,validateSchema(createTaskSchema),createTask);

router.delete('/tasks/:id',authRequired,deleteTask);

router.put('/tasks/:id',authRequired,updateTask);

export default router;