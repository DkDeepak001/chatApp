require('dotenv').config();
const express = require('express');
const app = express();

//intializing express json 
app.use(express.json());



app.route("/").get(async(req,res) => {
    res.send("server working");
})

//starting server 
if(process.env.MODE === "development"){
    app.listen(5000,()=>{``
        console.log("server is listening on port 5000")
    })
}else if(process.env.MODE === "production"){
    app.listen(process.env.PORT ,()=>{
        console.log("server is listening on port 5000")
    }) 
}

