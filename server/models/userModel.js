const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        phone:{
            type:String
        },
        roles:{
            type:String,
            enum:["User","Admin"],
            default:"User"
        },
        active:{
            type:Boolean,
            default:true
        }


    }
    , { timestamps: true })

module.exports=mongoose.model("User",userSchema)