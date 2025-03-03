function databaseConnection(){
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
mongoose.connect(process.env.dbUrl).then(()=>{
    console.log('Connected to Server ')
}).catch(err => console.log(err))
}
module.exports = databaseConnection;