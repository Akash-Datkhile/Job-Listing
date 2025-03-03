const Admin=require('../model/adminModel.js')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const user=require('../model/userModel.js')
//register new admin
const adminRgister=async (req,res)=>{
    try{
        const {name,email,password,phone}=req.body
        if(!name||!email||!password||!phone)
        {
            res.status(404).json("All fields are required")
        }
        else 
        {
            const admin=await Admin.findOne({email})
            if(!admin)
            {
                const hashedPassword=await bcrypt.hash(password,10)
                const newAdmin=new Admin({name,email,password:hashedPassword,phone})
                await newAdmin.save()
                res.status(201).json({message:"Admin registered successfully"})
            }
            else{
                res.status(409).json({message:"Admin already exists"})
            }
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

//login admin
const adminLogin=async (req,res)=>{
    try
    {
        const {email,password}=req.body
        if(!email||!password){
            res.status(404).json("All fields are required")
        }
        else
        {
            const admin=await Admin.findOne({email})
            if(admin)
            {
                const isMatch=await bcrypt.compare(password,admin.password)
                if(isMatch)
                   {
                        const token=jwt.sign({id:admin._id},"secret",{expiresIn:'1h'})
                        res.status(200).json({token:token,message:'login success',name:admin.name,email:admin.email,phone:admin.phone})
                   }
                 else
                   {
                        res.status(401).json({message:"Invalid credentials"})
                   }
            }
            else
            {
                 res.status(404).json({message:"Invalid credentials"})
            }
        }
    }
    catch(err)
    {
        res.json({error:err.message})
    }
}

//get all user from user collection
const getAllUsers=async (req,res)=>{
    try
    {
        const {email,password}=req.body
        if(!email||!password)
        {
            res.status(404).json("All fields are required")
        }
        const admin=await Admin.findOne({email})
        if(admin)
        {
            const isMatch=await bcrypt.compare(password,admin.password)
            if(isMatch)
            {
                const users=await user.find()
                res.status(200).json(users)
            }
            else
            {
                res.status(401).json({message:"Invalid credentials"})
            }
        }


    }
    catch(err)
    { 
        res.status(500).json({error:err.message})
    }
}



module.exports={adminRgister,adminLogin,getAllUsers}