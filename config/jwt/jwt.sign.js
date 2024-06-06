import jwt from "jsonwebtoken";

export default (id,res)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,
        {expiresIn: '30d' })

    res.cookie("user",token,{
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
        sameSite:"strict",
        secure: process.env.SECURE
    })
}