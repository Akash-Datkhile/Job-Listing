const express = require('express')
const router = express.Router()
const varifyuser = require('../middleware/verifyUserLoggedInAuth.js')

const {registerUser,userLogin,updateUserDetails,getAllPostedJob, deleteUserWithPostedJob}=require('../controller/userController')
router.get('/',(req,res)=>{
    res.status(200).send("user route")
})

router.post('/register',registerUser)
router.post('/login',userLogin)
router.patch('/update/:id',varifyuser,updateUserDetails)
router.get('/postedJob/:id',varifyuser,getAllPostedJob)
router.delete('/delete/:id',varifyuser,deleteUserWithPostedJob)
module.exports = router;
