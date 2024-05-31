import React, { useState, useEffect } from 'react';
import '../useredit/Edit.css';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl/BaseUrl';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function EditUser() {
    const [userData,setUserData]=useState('');
    const navigate = useNavigate();
    const val = localStorage.getItem('token');
    const [info, setInfo] = useState({
        id:'',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const details=async()=>{
            const userid=localStorage.getItem('id');
        try {
           
         
            
    const response=await axios.put(baseURL+'/editUser',userid,{
        headers:{
            'content-type':'application/json',
            Authorization:`Bearer ${val}`
        }
       
    })
   
    const data=response.data;
    setUserData(data)
    console.log(data);

   
    
        
    } catch (error) {
        console.log('error :', error)
        
    }}
    details();
},[]);

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const updateInfo = async (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: ''
        };

        if (!info.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (!info.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        if (!info.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(info.email.trim())) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        if (!info.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Mobile number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(info.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Invalid mobile number';
            valid = false;
        }

        if (valid) {
            try {
                const formData = new FormData();
                formData.append('id',userData.id)
                formData.append('userName', info.userName);
                formData.append('firstName', info.firstName);
                formData.append('lastName', info.lastName);
                formData.append('email', info.email);
                formData.append('phoneNumber', info.phoneNumber);
              

                const response = await axios.put(baseURL + '/updateEdit', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${val}`
                    }
                });
                alert('successfully completed');
                localStorage.removeItem('id')
                navigate('/userlist');
            } catch (error) {
                console.log('error :', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Update User Details</h2>
                <form onSubmit={updateInfo}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            placeholder={userData.firstName}
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, firstName: e.target.value }))}
                            type="text"
                            id="firstName"
                            name="firstName"
                          
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            placeholder={userData.lastName}
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, lastName: e.target.value }))}
                            type="text"
                            id="lastName"
                            name="lastName"
                            
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, email: e.target.value }))}
                            type="email"
                            id="email"
                            name="email"
                            placeholder={userData.email}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Mobile Number:</label>
                        <input
                            
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, phoneNumber: e.target.value }))}
                            type="text"
                            id="number"
                            name="number"
                            placeholder={userData.phoneNumber}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;