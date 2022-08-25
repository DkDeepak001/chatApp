require('dotenv').config({path:'../.env'})
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log('connected');
})
.catch((e)=>{
    console.log("Something went wrong", e);
})

//creating new schema for created collection
const newUserSchema = new mongoose.Schema({
    userId:String,
    userName:String,
    password:String,
    email:String,
}) 
newUserSchema.index({userName:'text'})

//creating new document for storing data
const newUser = new mongoose.model("User",newUserSchema)

module.exports = {
    newUser
}