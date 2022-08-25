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
  useEffect(() => {
    if(UserDetails.username !== '') localStorage.setItem("reduxState",JSON.stringify(UserDetails));
  },[User]);

  const searchUser = async (e) => {
    const querry = e.target.value;
    const fetchUser = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?s=${querry}`,{headers: {Accept: "application/json","Content-Type": "application/json;charset=UTF-8", Authorization: `Bearer ${token}`}});
    setSearchUserArr(fetchUser.data.user);
  }
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reduxState");
    navigate("/sign");
  }
  const addFriend = async(id) => {
    console.log(id)
  }


  return (
    <div>{localStorage.getItem("token")?
      <div className='container-home'>
        <div className='left-container'>
          <h2>{UserDetails.username || User.username}</h2>
          <button onClick={logout}>Logout</button>
        </div>
       <div className='right-container'>
        <div className="home-sub-container">
          <div className= {searchUserArr.length === 0 ? "searchInput" : "searchInput active"}>
            <input type="text" placeholder="Search user" onChange={searchUser} />
            <div className="resultBox">
              {searchUserArr.length !== 0 ?searchUserArr.map((e,index) =>
               <li className='searchResult-dropdown' key={index}>
                  <p>{e.userName}</p>
                  <button className='add-btn' onClick={()=>addFriend(e._id)}> Add </button>
               </li>)
               :<></>}
            </div>
            <div className="icon"><i className="fas fa-search"></i></div>
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