const jwt = require('jsonwebtoken');
const Job = require('../model/jobModel');


const verifyJobOwnership = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Access Denied");
        }

        const decodedToken = jwt.verify(token, "secret");
        const refUserId = decodedToken.userId;

        // Check if the user owns the job by finding the job with the refUserId
        const user = await Job.findOne({ refUserId });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        next();       
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error " });
    }
};

module.exports = { verifyJobOwnership };
