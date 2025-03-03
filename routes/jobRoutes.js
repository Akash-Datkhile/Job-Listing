const express = require('express')
const router = express.Router()
 
//adding custom middleware
const varifyuser = require('../middleware/verifyUserLoggedInAuth.js')
const {verifyJobOwnership}=require("../middleware/verifyJobOwnership.js")
const { createNewjob, getAllJobs, getJobById, updateJob, deleteJobById } = require('../controller/jobController.js')
router.get('/',(req,res)=>{
    res.status(200).send("job route")
})
router.post('/create/:id',varifyuser,createNewjob)
router.get('/allJobs',getAllJobs)
router.get('/getJob/:id', getJobById);
router.patch('/update/:id',verifyJobOwnership,updateJob);
router.delete('/delete/:id',verifyJobOwnership,deleteJobById)

module.exports = router;
