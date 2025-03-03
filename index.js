const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection=require('./config/connectionDB.js');
dotenv.config();
const port=process.env.port||3000

//importing routes
const userAuthRoute=require('./routes/userRoutes.js')
const jobRoute=require('./routes/jobRoutes.js')
const adminRoute=require('./routes/adminRoutes.js')


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//custome routes for each module
app.use('/api/user',userAuthRoute);
app.use('/api/job',jobRoute);
app.use('/api/admin',adminRoute);


//default route
app.get('/', function(req, res){
    res.send('Hello World!');
});


app.listen(port,connection())