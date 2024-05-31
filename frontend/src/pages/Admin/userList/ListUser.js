import React, { useEffect, useState } from 'react';
import '../userList/Listuser.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { baseURL } from '../../../BaseUrl/BaseUrl';
import { Link, useNavigate } from 'react-router-dom';
import EditUser from '../useredit/EditUser';

function ListUser() {
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchdata, setSearch] = useState({
        firstName: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(baseURL + '/getAll', {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.log('error :', error);
            }
        }
        getData();
    }, []);

    const deleteUser = async (id) => {
        try {
            alert('are you sure to delete? ')
            await axios.put(baseURL + '/deleteUser', id, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.log('error : ', error);
        }
    }

    const editUser = (id) => {
        localStorage.setItem('id', id);
        navigate('/edituser');
    }

    const handleSearchChange = async (e) => {
        const searchItem = e.target.value;
        setSearch({ firstName: searchItem });
        try {
            const formdata = new FormData();
            formdata.append('firstName', searchItem);
            const response = await axios.put(baseURL + '/search', formdata, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setUsers(response.data);
                if(!users){
                    alert("the user not found")
                }
            } else {
              
                setUsers([]);
               
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ backgroundColor: '#6870ae', textAlign: 'center' }}>
                <input type='text' placeholder='Type here.....' onChange={handleSearchChange} />
            </div>

            <h1 className='heading'>LIST OF STUDENTS</h1>
            <div className='space'></div>
            <button style={{ background: 'darkblue' }}>
                <Link to={'/adduser'}>ADD NEW STUDENT</Link>
            </button>
            <div className='space'></div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.Number}</td>
                            <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                            <td><button onClick={() => editUser(user.id)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListUser;