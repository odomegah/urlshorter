import { Router } from "express";
import { login, logout, logup, passForger } from "../controllers/auth.controller.js";
import  { hecan } from "../config/jwt/jwt.verify.js";
import { isLogged } from "../middleware/isLogged.middleware.js";



const route = Router();

route.post('/logup',isLogged,logup)

route.post('/login',isLogged,login)

route.put('/passforget',isLogged,passForger)
route.get('/logout',hecan,logout)

export default route