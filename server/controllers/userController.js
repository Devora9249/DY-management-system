const User=require("../models/userModel")
const bcrypt=require("bcrypt")

const register= async (req,res)=>{
    const {username,password,name,email,phone}=req.body
    console.log(username,password,name,email,phone);

    if(!username || !password || !name || !email){
        return res.status(400).send("all details are required")
    }

    const checkName= await User.findOne({username:username}).lean()

    if(checkName)
        {
            return res.status(409).send("duplicate name")
        }


    const hashPassword= await bcrypt.hash(password,10)

    const addUser= await User.create({username,password:hashPassword,name,email,phone})
    
    if(!addUser)
        {
            return res.status(409).send("bad request ☹")
        }

        res.json(`user ${addUser.username} with email ${addUser.email} registered succesfully`)
}



const login=(req,res)=>{
    res.send("register")
}


module.exports={login,register}