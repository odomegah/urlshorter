
export const getUser = (req, res)=>{
    try {
        const user = req.user;
        if(user){
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}