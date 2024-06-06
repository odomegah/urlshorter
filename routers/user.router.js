import { Router } from "express";
import { hecan } from "../config/jwt/jwt.verify.js";
import { getUser } from "../controllers/user.controller.js";

const userrouter = Router();

userrouter.get('/get',hecan,getUser)

export default userrouter