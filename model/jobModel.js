const mongoose=require('mongoose');
const Schema=mongoose.Schema
const jobSchema=new Schema({
    title:{
        type:String,
        required:true
    },
   
    companyName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    locationtype:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    refUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('Job',jobSchema)