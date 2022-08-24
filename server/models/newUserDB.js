const {newUser} = require('./conn');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


exports.signUp = async ({userName,email,password}) => {
    const result = userName.trim();
    let username = result.replace(/\s/g, "");
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const findUser = await newUser.findOne({userName:username})
    if(findUser === null) {
        const createUser =  new  newUser({
            userId:uuidv4(),
            userName:username,
            password:hashedPassword,
            email:email,
        })
        const result = await createUser.save();
        return {status:"sucess", message : "create sucessfully"};
    }else{
        return {status : 'error', message: "username already exists"};
    }
}

exports.logIn  = async({userName,password}) => {
    const result = userName.trim();
    let username = result.replace(/\s/g, "");
    const User = await newUser.findOne({userName:username})
   if(User !== null){
    const chechkPass = await bcrypt.compare(password, User.password);
        if(chechkPass) {
            const token = jwt.sign({username : User.userName},process.env.JWT_KEY);
            return {status:"sucess" , message : "sucessfull Login",token: token};
        }
        if(!chechkPass) return {status:"error" , message : "Incorrect username or password"};
   }else{
    return {status:"error" , message : "Incorrect username or password"};
   }
}
