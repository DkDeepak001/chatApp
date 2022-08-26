import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useNavigate}from 'react-router-dom';
import './home.css';
import axios from 'axios';

const Home = () => {
  let navigate = useNavigate()
  const UserDetails = useSelector((state) => state.user.value)
  const [User,setUser]  = useState(JSON.parse(localStorage.getItem("reduxState")))
  const [searchUserArr,setSearchUserArr] = useState([])
  const [token,setToken] = useState(localStorage.getItem("token"))
  const [messageId , setMessageId]= useState();
  const [messageIdName , setMessageIdName]= useState();
  const [inbox ,setInbox] = useState();
  const [searchvalue,setSearchvalue] = useState()
  const [messageBox ,setMessageBox] = useState()
  const [messageArr,setMessageArr] =useState([])
  
  useEffect(() => {
    if(UserDetails.username !== '') localStorage.setItem("reduxState",JSON.stringify(UserDetails));
  },[User]);
  
  useEffect(()=>{
    if(messageId !== undefined) fetchMessage(messageId);
    fetchInbox();
  },[]);

 
  useEffect(() => {
    //setTimeOut and fetch message
  })
  
  const fetchInbox = async () => {
    const fetchUser = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fetchInbox`,{headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8", Authorization: `Bearer ${token}`}});
    setInbox(fetchUser.data.user);
  }
  const searchUser = async (e) => {
    const querry = e.target.value;
    setSearchvalue(querry)
    const fetchUser = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?s=${querry}`,{headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8", Authorization: `Bearer ${token}`}});
    setSearchUserArr(fetchUser.data.user);
    
  }
  const addToMessage = async(id) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/addToMessage`,{data:{friendId:id,token : token }},{headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8",Authorization: `Bearer ${token}`}})
    if(response.data.status === 'sucess') fetchInbox(); setSearchvalue("");setSearchUserArr([]);
  }
  const openMessage = (id) => {
    setMessageId(id);
    fetchMessage(id);
  }
  const fetchMessage = async(msgId) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/fetchMessage`,{data:{messageId: msgId}});
    setMessageArr(response.data.message)
  }

  const sendMessage = async () =>{
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendMessage`,{
      data:{
        messageId:messageId,
        message:messageBox,
        reciverName:messageIdName,
        sendername:User.username,
        timeStamp: new Date().toLocaleString(),
      }}
    )
    if(response.data.status === 'sucess') setMessageBox("");
    fetchMessage(messageId);

  }
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reduxState");
    navigate("/sign");
  }



  return (
    <div>{localStorage.getItem("token")?
      <div className='container-home'>
        <div className='left-container'>
        
       <div className='message-Container'>
          <div className='left-messageContainer'>
            <div className='left-messageContainerlist'>
              {inbox && inbox.length !== 0 ? inbox.map((e,index) => <div key={index}  onClick={() => {openMessage(e.messageId);setMessageIdName(e.username)}}>
                <li className='friendsList' style={{cursor:'pointer'}} >
                <div className='header-profile'>
                  <div className='profilePic-left'></div>
                  <h3>{e.username}</h3>
              </div>
          </li>
          </div>):"No Message found"}
            </div>
          </div>
          {messageId ? 
          <div className='right-messageContainer'>
          <div className='header-messageBox'>
                  <div className='profilePic-left'></div>
                  <h3>{messageIdName}</h3>
          </div>
          <div className='main-messageBox'>
            {messageArr.length !== 0 ? 
              messageArr.map((e,index) => <div className='alignment' style={{alignItems: e.senderName === User.username ? "flex-end" :"flex-start"}}>
              <div className={e.senderName === User.username ? "senderMsg":"reciverMsg"}>
                <p>{e.message}</p>
              </div>
              </div>)
           
              : "no message"}
          </div>
          <div className='footer-messageBox'>
              <textarea className='messageTextBox' placeholder='Enter a message' value={messageBox} onChange={(e)=> {setMessageBox(e.target.value)}}></textarea>
              <button className='sendBtn' onClick={sendMessage}>Send</button>
          </div>
        </div>
          :
          ""
          }
       </div>
        </div>
      <div className='right'>
       <div className='right-container-header'>
          <div className='header-profile'>
            <div className='profilePic'></div>
            <h2>{UserDetails.username || User.username}</h2>
          </div>
          <button onClick={logout}>Logout</button>
       </div>
      <div className='right-container'>
        <div className="home-sub-container">
          <div className= {searchUserArr.length === 0 ? "searchInput" : "searchInput active"}>
            <input type="text" placeholder="Search user" value={searchvalue} onChange={searchUser} />
            <div className="resultBox">
              {searchUserArr.length !== 0 ?searchUserArr.map((e,index) =>
               <li className='searchResult-dropdown' key={index}>
                  <p>{e.userName}</p>
                  <button className='add-btn' onClick={()=>addToMessage(e._id)}> Add to message </button>
               </li>)
               :<></>}
            </div>
            <div className="icon"><i className="fas fa-search"></i></div>
          </div>
        </div>
       </div>
      </div>
      </div>
      :
      <Navigate replace to={"/sign"} />
    }</div>
  )
}

export default Home