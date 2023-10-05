import express from"express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import setDdb from "./db.js";


const  app=express();
setDdb();
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
app.use("/api",authRoutes);
app.use("/api",taskRoutes);



export default app;