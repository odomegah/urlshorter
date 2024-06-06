//importation de la librairie express
import express from 'express'
import mongoose from "mongoose";
import path from 'node:path'
// import cors from 'cors'
//importation de la lib dotenv
import dotenv from "dotenv"
// import mongodb from './config/mongodb/mongodb.js';
import route from './routers/auth.router.js';
import cookieParser from 'cookie-parser';
import {urlRoute} from './routers/url.route.js';
import userrouter from './routers/user.router.js';
import { urlvisite } from './controllers/url.controller.js';


//creation d'une instance d'express
const app = express();
//execution de la methode config()
dotenv.config()
const PORT = process.env.PORT || 3000;

//middleware pour accerpter les formats json
// app.use(cors())
app.use(express.json())
app.use(cookieParser())
//importation d'une instance de Router
//Creation de route en utilisant un middleware
app.use("/api/user",userrouter)
app.use("/api/auth",route)
app.use("/api/url",urlRoute)
app.get("/api/:path",urlvisite)

app.use(express.static(path.join(path.resolve(),"public","browser")))
app.get("*",(req,res)=>{
res.sendFile(path.join(path.resolve(),"public","browser","index.html"))
// console.log()
})

mongodb()

async function mongodb (){
    try {
     await mongoose.connect(process.env.DB_MONGO);
     console.log("Connection effectee a Mongo")
     app.listen(PORT,()=>{
        console.log(`Serveur en marche sur le port: ${PORT}`)
    })
    } catch (error) {
     console.log(error.message)
    }
 }