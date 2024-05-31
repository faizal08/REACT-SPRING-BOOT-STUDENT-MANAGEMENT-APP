import React, { useState, useEffect } from 'react';
import '../editProfile/EditPro.css';
import axios from 'axios';
import { baseURL } from '../../BaseUrl/BaseUrl';
import NavLogined from '../user/navbar/NavLogined';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();
    const val = localStorage.getItem('token');
    const [info, setInfo] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        image: null 
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(baseURL + '/current-user', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${val}`
                    }
                });
                const userData = response.data;
                setInfo(prevInfo => ({
                    ...prevInfo,
                    userName: userData.username,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber
                 }));
            } catch (error) {
                console.log('error :', error);
            }
        };
        fetchProfile();
    }, [val]); 

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
                formData.append('userName', info.userName);
                formData.append('firstName', info.firstName);
                formData.append('lastName', info.lastName);
                formData.append('email', info.email);
                formData.append('phoneNumber', info.phoneNumber);
              

                const response = await axios.put(baseURL + '/updateUser', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${val}`
                    }
                });
                alert('successfully completed');
                navigate('/profile');
            } catch (error) {
                console.log('error :', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <NavLogined />
            <div className="container">
                <h2>Update User Details</h2>
                <form onSubmit={updateInfo}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            placeholder={info.firstName}
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
                            placeholder={info.lastName}
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
                            placeholder={info.email}
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, email: e.target.value }))}
                            type="email"
                            id="email"
                            name="email"
                           
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Mobile Number:</label>
                        <input
                            placeholder={info.phoneNumber}
                            onChange={(e) => setInfo(prevInfo => ({ ...prevInfo, phoneNumber: e.target.value }))}
                            type="text"
                            id="number"
                            name="number"
                           
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;