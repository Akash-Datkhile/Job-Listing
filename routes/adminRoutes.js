const express = require('express')
const router=express.Router()
const {adminRgister, adminLogin,getAllUsers}=require('../controller/adminController.js')
//default route

router.get('/',(req,res)=>{
    res.status(200).send("admin route")
})
router.post('/register',adminRgister)
router.post('/login',adminLogin)
router.post('/getAllUser',getAllUsers)
module.exports=router;