const Job=require('../model/jobModel.js')

const createNewjob=async(req, res,next) => {
try{
    const{title,companyName,location,salary,description,locationtype,jobtype,skills}=req.body;
    if(!title || !companyName || !location || !salary || !description || !locationtype || !jobtype || !skills)
    {
        return res.status(400).json({msg:'Please fill all fields'})
    }

//css,js,java,python:-> frontend in form of string
    const skillsArray=skills.split(',').map((skill) =>skill.trim())
// convert string to array
    const newJob=new Job({
        title,
        companyName,
        location,
        salary,
        description,
        locationtype,
        jobtype,
        skills:skillsArray,
        refUserId:req.userId,
        createdAt:new Date(),
        updatedAt:new Date()

    });
    await newJob.save()
    res.status(201).json({Message:"new Job Created",newJob})

}catch(err){
    console.log(err)
    res.status(500).send('Server Error')
    next(err)
}
}
//get all jobs
const getAllJobs=async(req, res,next) => {
try{
    const jobs=await Job.find().sort({createdAt: -1}).select(['title', 'companyName', 'location', 'salary', 'skills'])
    res.json(jobs)
}catch(err){
    console.log(err)
    res.status(500).send('Server Error')
    next(err)
}
}

//function to fetch job by ID
const getJobById = async (req, res, next) => {
    const { id } = req.params;  // Destructure 'id' from req.params directly
    try {
        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
        next(err);
    }
};

//function to upadate job by id
const updateJob=async (req, res, next) => {
    const {id}=req.params; 
    try{
        const job=await Job.findById(id)
    const skillsArray=req.body.skills? req.body.skills.split(",").map((skill)=>skill.trim()):null;
    const updateJob=await Job.findByIdAndUpdate(
        id,
        {
            title: req.body.title || job.title,
            companyName: req.body.companyName || job.companyName,
            location: req.body.location || job.location,
            salary: req.body.salary || job.salary,
            description: req.body.description || job.description,
            locationtype: req.body.locationtype || job.locationtype,
            jobtype: req.body.jobtype || job.jobtype,
            skills: req.body.skillsArray || job.skills,
            updatedAt: new Date()
        },
        { new: true }
    )
    if (updateJob)
    {
        res.json({Message:"updation successfull",updateJob})
    }
    else{
        res.status(404).json({msg:"No job found"})
    }
    }

    catch(err){
        console.log(err)
        res.status(500).send('Server Error')
        next(err)
    }
}

//function to delete job by id from job owner
const deleteJobById=async (req,res,next)=>{
    const jobId=req.params.id
    console.log(jobId)
    try{
        const job=await Job.findByIdAndDelete(jobId)
        if(job)
        {
            res.status(200).json({Message:"Job deleted from portal successfully"})
            
        }
        else{
            res.status(400).json({Message:"something went wrong"})

        }
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
        next(err)    }

}






module.exports={createNewjob,getAllJobs,getJobById,updateJob,deleteJobById}