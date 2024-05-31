import React,{useState,useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { baseURL } from '../../../BaseUrl/BaseUrl';
import Navbar from '../navbar/Navbar';


function UserLogin() {

  const navigate = useNavigate();
  const[loginData,setLoginData]=useState({
    username:'',
    password:''
  })
  
  const formSubmission = async (e) => {
    e.preventDefault();
      try {
      console.log("sent request successfully",loginData);
      const response = await axios.post(baseURL + '/generate-token', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
          
      localStorage.setItem('token',response.data.token)
      console.log(response.data);
     if(response.data.user.authorities[0].authority=='User'){
         navigate('/home')
     }else{
      navigate('/dashboard')
     }
      
      
     
     
  
    } catch (error) {
      console.error('an error occurred on login time:', error);
      alert("please Enter the correct User credentials")

    }
   
  };
  


  return (
    <div>
      <Navbar />
      <div >
        
    <section > <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
  
  <div class="signin"> 
  
   <div class="content"> 
  
    <h2>STUDENT LOGIN</h2> 
  <form onSubmit={formSubmission}>
    <div class="form"> 
  
     <div class="inputBox"> 
  
      <input type="text" name='username' value={loginData.username}  onChange={(e)=>{setLoginData({...loginData,username:e.target.value})}} required/> <i>Username</i> 
  
     </div> 
  
     <div class="inputBox"> 
  
      <input type="password" name='password' value={loginData.password} onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}}  required/> <i>Password</i> 
  
     </div> 
  
  
     <div class="inputBox"> 
  
      <button style={{width:'100px',height:'30px'}} type='submit' > Login</button> 
  
     </div> 

     
     <div class="links">  <Link to={'/signup'}>Signup</Link> 
  
     </div> 
  
    </div> 
    </form>
  
   </div> 
  
  </div> 
  
  </section>
      </div>
     

    </div>
  )
};

export default UserLogin;