import { Router } from "express";
import { create, getall, urlById, urlDel } from "../controllers/url.controller.js";
import  { hecan } from "../config/jwt/jwt.verify.js";


const urlRoute = Router();

urlRoute.post("/create",hecan,create)
urlRoute.get("/all",hecan,getall)
urlRoute.get("/:id",hecan,urlById)
urlRoute.delete("/delete/:id/:confirm?",hecan,urlDel)

export  {urlRoute}
