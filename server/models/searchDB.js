const {newUser} = require('./conn');


exports.searchUser = async (data) => {
        const result = data.trim();
        let username = result.replace(/\s/g, "");
        if(username !== ""){
            const findUser  = await newUser.find({ userName: { $regex:username ,$options:'i'} });
            return {status : "sucess" , user:findUser}
        }else{
            return {status : "sucess" , user:[]}
        }
   
}