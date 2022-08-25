const {newUser} = require('./conn');


exports.searchUser = async (data,user) => {
        const result = data.trim();
        let username = result.replace(/\s/g, "");
        if(username !== ""){
            const findUser  = await newUser.find({ userName: { $regex:username ,$options:'i'} });
           const  filterUser = (findUser.filter((a)=>{if(a.userName !== user){return a}}));
            return {status : "sucess" , user:filterUser}
        }else{
            return {status : "sucess" , user:[]}
        }
   
}