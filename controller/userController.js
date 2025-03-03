const User=require('../model/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job=require('../model/jobModel.js')



//Register User
const registerUser= async (req, res, next) =>{
    try{
        const{name,email,password,phone,address,dateOfBirth} = req.body;
       
    if(name=="" || email=="" || password=="" || phone=="" || address=="" || dateOfBirth=="")
    {
    console.log(`"name":"${name}","email":"${email}" "password":"${password}","phone":"${phone}","address":"${ address}","dateOfBirth":"${dateOfBirth}"`)
        return res.status(400).json({error:"Phone fields are required"});
    }
    const existingUser= await User.findOne({email}) && await User.findOne({phone});
    if(existingUser)
    {
        return res.status(400).json({error:"User already exists"});
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name,email,password:hashedPassword,phone,address,dateOfBirth});
        await user.save();
        // const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({message:"User saved successfully"});
    }
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }


}

//Login User
const userLogin=async (req, res) =>{
    try{
        const{email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({error:"Email and password fields are required"});
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({error:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id},"secret",{
            expiresIn:"1h"
        })
        res.status(200).send({token:token ,name:user.name,email: user.email,dateOfBirth:user.dateOfBirth,address:user.address,phone:user.phone});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
}

//update user details
const updateUserDetails=async (req,res) =>{
    try{
        const userId=req.params.id;
        const{name,email,password,phone,address,dateOfBirth} = req.body;
        const newPassword=await bcrypt.hash(password,10)
        const user=await User.findByIdAndUpdate(userId,
            {
                name:name ||user.name,
                email:email ||user.email,
                password:newPassword || user.password,
                phone:phone|| user.phone,
                address:address || user.address,
                dateOfBirth:dateOfBirth || user.dateOfBirth
            },
            {new:true});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.status(200).json({message:"User details updated successfully",user});
    }
    catch(error){
        // console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const getAllPostedJob=async (req,res)=>{
    const userId=req.params.id;
    try{
const user=await User.findById(userId)
    if(user)
    {   
        const jobs=await Job.find({refUserId:userId})
        res.status(200).json({message:` Jobs posted by ${user.name}`,jobs})

    }
    else{
        res.status(401).json('Something went wrong')
    }
}
catch(err){
    console.log(err)
    res.status(500).json({error: "Internal Server Error"});

}
}


// delete user account with all the posted jobs 
const deleteUserWithPostedJob=async (req,res)=>{
    const userId=req.params.id;
    try {
        const user=await User.findById(userId)
        if(user)
        {
            const deleteAllJobs=await Job.deleteMany({refUserId:userId})
            if(!deleteAllJobs)
            {
                const deleteUser=await User.findByIdAndDelete(userId)
                if(deleteUser)
                res.status(200).json("user Account delete Successfully")
            }
            else{
                const deleteUser=await User.findByIdAndDelete(userId)
                if(deleteUser)
                res.status(200).json("User Account deleted With Posted Jobs")

                }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server Error")
    }
}
module.exports={registerUser,userLogin,updateUserDetails,getAllPostedJob,deleteUserWithPostedJob};
