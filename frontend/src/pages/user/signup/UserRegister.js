import React,{useState}from 'react'
import '../signup/Signup.css'
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";
import { baseURL } from '../../../BaseUrl/BaseUrl';
import Navbar from '../navbar/Navbar';


function UserRegister() {
  const navigate=useNavigate();
  const[details,setDetails]=useState({
    firstName: '',
    lastName:'',
    username:'',
    email: '',
    phoneNumber: '',
    password: ''
  });
  function PrintLog(){
    console.log(details);
  }
  const[values,setValues]=useState();



  const submitData = async (e) => { 
    e.preventDefault();
    setValues(details);
    
    if ( validateForm()) {
     
      console.log("success");
        try {
          await axios.post('http://localhost:8081/create', details,{
          headers: {
            'Content-Type': 'application/json',
            
          },
          })
          .then((response)=>{console.log(response.data,)
              setDetails({
                firstName:'',
                lastName:'',
                username:'',
                email: '',
                phoneNumber: '',
                password: ''
            });
            alert("your Account has been successfully Created...  ")
            navigate("/login");

            })
         .catch(error=>{console.log('error:' ,error,alert("/ERROR/   the username or E-mail is already in use place use another one /"))
        });

          
        } catch (error) {
            console.log('Error signing up:', error)
        }
    } else {
        console.log("Form data is empty");
    }
}
const validateForm = () => {
  const { firstName, lastName, email, phoneNumber, password } = details;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const phoneRegex = /^\d{10}$/; 

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    alert("Please fill out all fields.");
    return false;
  }

  if (firstName.length < 2 || lastName.length < 2) {
    alert("Enter the name properly");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};


   
  



  return (
    <div>
      <Navbar />
          <section>
                      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
      
      <div class="signin"> 
      
       <div class="content"> 
      
        <h2>Sign Up</h2> 
        <form onSubmit={submitData}>
      
        <div class="form"> 
      
         <div class="inputBox"> 
      
          <input type="text" name='firstname' value={details.firstName} onChange={(e)=>{setDetails({...details,firstName: e.target.value}) }} required/> <i>firstName</i> 
      
         </div> 
         <div class="inputBox"> 
      
      <input type="text" name='lastName' value={details.lastName} onChange={(e)=>{setDetails({...details,lastName: e.target.value}) }}  required/> <i>lastName</i> 
  
     </div>
     <div class="inputBox"> 
      
      <input type="text" name='username' value={details.username} onChange={(e)=>{setDetails({...details,username: e.target.value}) }}  required/> <i>userName</i> 
  
     </div> 
         <div class="inputBox"> 
      
      <input type="text" name='email' value={details.email} onChange={(e)=>{setDetails({...details,email: e.target.value}) }}required/> <i>Gmail</i> 
  
     </div> 
        
      
         <div class="inputBox"> 
      
          <input type="Number" name='phoneNumber' value={details.phoneNumber} onChange={(e)=>{setDetails({...details,phoneNumber: e.target.value}) }} required/> <i>Number</i> 
      
         </div> 
         <div class="inputBox"> 
      
        <input type="password" name='password' value={details.password} onChange={(e)=>{setDetails({...details,password: e.target.value}) }}  required/> <i>Enter Password</i> 
  
          </div> 
      
         
      
         <div class="inputBox"> 
      
         <button style={{width:'100px',height:'30px'}} type='submit'> Submit</button>
       
      
         </div> 
      
        </div> 
        </form>
        <div class="links">  <Link to={'/login'}>Sign In</Link> </div> 
       </div> 
      
      </div> 
          </section>
          </div>
   
  )
}

export default UserRegister;