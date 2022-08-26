const {newUser , inbox, Message} = require('./conn');
require("dotenv").config({path:"../.env"})
const jwt = require("jsonwebtoken");

exports.message = async ({friendId,token}) => {
    const decoded = await jwt.verify(token,process.env.JWT_KEY);
    const findUserID = await newUser.findOne({userName:decoded.username});
    const findFriend = await newUser.findById(friendId);
    const checkIfHaveInbox = await inbox.findOne({ userId : findUserID._id, friendId : findFriend._id})
    const checkIfHaveInbox2 = await inbox.findOne({ friendId : findUserID._id, userId : findFriend._id})
    if(checkIfHaveInbox === null && checkIfHaveInbox2 === null){
        const newInbox = new inbox({
            userId:findUserID._id,
            friendId:findFriend._id
        }) 
        const result = await newInbox.save();
        console.log(result._id);
        const newMessage = new Message ({
            messageID: result._id,
        })
        await newMessage.save();
        return {status:"sucess" , messageId : newMessage.newMessage};
    }else{
        const messageId =  checkIfHaveInbox || checkIfHaveInbox2;
        return {status:"sucess" , messageId : messageId._id};

    }
}

exports.fetchInbox = async (token) => {
    const decoded =  jwt.verify(token,process.env.JWT_KEY);
    const findUserID = await newUser.findOne({userName:decoded.username});
    const inUserId = await inbox.find({userId : findUserID.id});
    const inFriendId = await inbox.find({friendId: findUserID.id})
    const AddedId = inUserId.map((e) => {return {userId :e.friendId,messageId : e.id}});
    const AcceptedId = inFriendId.map((e) => {return {userId :e.userId,messageId : e.id}});
    const combineId = AddedId.concat(AcceptedId);
    const arr = await Promise.all( combineId.map(async(e) => {
        const usr = await newUser.findById(e.userId)     
        return {username : usr.userName , userId : e.userId , messageId: e.messageId}
    }))
    return {status : "sucess" , user : arr};
}


exports.fetchMessage = async (msgId) => {
    const fetchMessageId = await Message.findOne({messageID : msgId})
   
    return {status:"sucess",message: fetchMessageId.messageArr }

}

exports.sendMessage =async ({messageId,message,reciverName,sendername,timeStamp}) => {
    const findMessageId = await Message.findOneAndUpdate({messageID : messageId},{$push:{messageArr:{reciverName:reciverName,senderName:sendername,message:message,timeStamp:timeStamp}}});
    return {status:"sucess"}
}
