import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../../BaseUrl/BaseUrl'
import '../../Admin/Navbar/Navbar.css'

function Navbar() {
    const token=localStorage.getItem('token')
const navigate=useNavigate();
  
    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.get(baseURL + '/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token')
            navigate('/login')
    
        } catch (error) {
            console.log('error :', error);
        }
    };
    
  return (
    <div>
         <div class="topnav">
  <Link class="active" to={'/dashboard'}>Home</Link>
  <Link onClick={logout}>logout</Link>
  
</div>
    </div>
  )
}
export default Navbar