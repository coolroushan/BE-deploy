const express=require("express")
const {UserModel}=require("../middleware/model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass}=req.body
try {
    bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.status(200).json({err:err.message})
        }else{
            const user=new UserModel({name,email,pass:hash})
            await user.save()
            res.status(200).json({msg:"new user has been register",user:req.body})
        }
    })
    
} catch (error) {
    res.status(400).json({error:error.message})
}
})

userRouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id,user:user.name},process.env.secret)
                    res.status(200).json({msg:"Logged In",token})
                }else{
                    res.status(200).json({error:"Wrong Credential"})
                }
            })
        }else{
            res.status(200).json({msg:"User does not found!"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports={
    userRouter
}