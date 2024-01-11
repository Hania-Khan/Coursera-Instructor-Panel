import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import mongoose, { connect } from "mongoose";
import quizRouter from './routes/CreateQuiz.js';
import courseRouter from './routes/CourseMaterialRoute.js'
import router from './controller/authController.js';
import assgnRouter from './routes/AssignmentRoute.js'
// import userRoutes from './routes/userRoutes.js';
import {fileURLToPath} from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), './client/build')));
app.use(express.static(join(dirname(__filename), './client/build')));

app.use(cors())
app.use (express.json())
app.use(express.urlencoded({extended:true}))

dotenv.config();

mongoose.connect("mongodb+srv://hania:88888888@onlineeducationplatform.jjhy2ci.mongodb.net/OurCoursera")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(()=>{
    console.log('Failed');
})
//Home Url
// app.get("/", (req,res)=>{
//     res.send("Welcome to Instructor Panel")
//     })



app.use("*",function (req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

    // app.use('/', userRoutes);
// Auth routes
app.use('/', router);

// Create Quiz7
app.use("/", quizRouter);

//Upload Course Material
app.use('/', courseRouter);


//Assignmnet routes
app.use('/', assgnRouter);

app.listen(8000,()=>{
    console.log("Connected to Port : 8000");
})







//Connected With MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(()=>{
//     console.log("Connected to MongoDB");
// })
// .catch(()=>{
//     console.log('Failed');
// })

