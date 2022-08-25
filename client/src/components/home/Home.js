import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useNavigate}from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  const UserDetails = useSelector((state) => state.user.value)

  useEffect(() => {
    console.log(UserDetails);  
  })


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/sign");
  }
  return (
    <div>{localStorage.getItem("token")?
      <>
        <h2>{UserDetails.username}</h2>
        <button onClick={logout}>Logout</button>
      </>
      :
      <Navigate replace to={"/sign"} />
    }</div>
  )
}

export default Home