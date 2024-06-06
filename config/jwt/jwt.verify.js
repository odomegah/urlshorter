import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js';

export const hecan =  async (req,res,next)=>{
   try {
    const token = req.cookies.user;
    if(!token){

       return res.status(400).json("Connectez-vous pour effecter cette action")
    } 
    
    const {id} = jwt.verify(token,process.env.JWT_SECRET);
    
    const user = await User.findById(id).select("-password")

    if(!user){
      res.cookie("user","",{maxAge:0})
       return res.status(400).json("Cet utilisateur n'existe pas")
    } 

    req.user = user

    next()
   } catch (error) {
    res.cookie("user","",{maxAge:0})
     console.log(error.message);
    res.status(500).json(error.message);
   }
}