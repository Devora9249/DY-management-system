const express=require("express")
const router=express.Router()
const userFunc=require("../controllers/userController")


router.post("/login",userFunc.login)
router.post("/register",userFunc.register)


module.exports=router