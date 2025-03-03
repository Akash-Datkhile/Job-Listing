const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyUser=(req,res,next)=>{
   try{
    const token=req.headers.authorization;
    const id=req.params.id;
    if(!token)
    {
        return res.status(401).send("Access Denied");
    }
    const decodeToken=jwt.verify(token,"secret");
    const userId=decodeToken.userId;
    if(userId===id)
    {
        next();
    }
    else{
        console.log(id)
        console.log(userId);
        
        return res.status(401).send("Access Denied user auth failed");
    }


   }catch(err){
    return res.status(400).send("Invalid Token");
   }
}

module.exports=verifyUser;