require('dotenv').config({path:".env"});
const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/newUserDB');
const jwt = require("jsonwebtoken");
const search = require("./models/searchDB");
const message = require('./models/messageDB');

//intializing express json 
app.use(express.json());
//using cors
app.use(cors())


//token validation
async function validateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({status:"error", message:"Token not found"})
    req.token = token
    const decoded = jwt.verify(token,process.env.JWT_KEY ,(err,usr) => {
        if(err) return res.status(403).json({message:"token not valid"})
        req.user = usr.username
        next()
    });
    
}


//home route
app.route("/")
    .get(validateToken, async(req,res) => {
        res.send("server working");
    })


//login route
app.route("/login")
    .post(async(req,res) => {
        const response = await User.logIn(req.body.data);
        (response.status === 'error') ? res.status(403).json(response) :((response.status === 'sucess')?res.status(200).json(response):res.status(500).json({error:"server side error"}));
    })


//sigin route
app.route("/signUp")
    .post(async(req,res) => {
       const response = await User.signUp(req.body.data);
       (response.status === 'error') ? res.status(403).json(response) :((response.status === 'sucess')?res.status(200).json(response):res.status(500).json({error:"server side error"}));
    })


//validataing token 
app.route("/validate")
    .get(validateToken ,async(req,res) => {
        console.log(req.user);
        res.status(200).json({status:"sucess" , username : req.user})
    })

//search Querry
app.route("/search")
    .get(validateToken ,async(req,res) => {
        const response = await search.searchUser(req.query.s, req.user);
        if(response.status == 'sucess') res.status(200).json(response)
        if(response.status == 'error') res.status(403).json(response)
    })
    
app.route("/addToMessage")
    .post(validateToken , async(req,res) => {
        const response  = await message.message(req.body.data);
        if(response.status == 'sucess') res.status(200).json(response);
        
    })
    
app.route("/fetchInbox")
    .get(validateToken , async (req,res) => {
        const response = await message.fetchInbox(req.token);
        if(response.status == 'sucess') res.status(200).json(response);
    })
    
app.route("/fetchMessage")
    .post(async(req,res) => {
        const response = await message.fetchMessage(req.body.data.messageId);
        if(response.status == 'sucess') res.status(200).json(response);
        
    })
    app.route("/sendMessage")
    .post(async(req,res) => {
        const response = await message.sendMessage(req.body.data);
        if(response.status == 'sucess') res.status(200).json(response);
    })
//starting server 
if(process.env.MODE === "development"){
    app.listen(5000,()=>{
        console.log("server is listening on port 5000")
    })
}else if(process.env.MODE === "production"){
    app.listen(process.env.PORT ,()=>{
        console.log("server is listening on port 5000")
    }) 
}

