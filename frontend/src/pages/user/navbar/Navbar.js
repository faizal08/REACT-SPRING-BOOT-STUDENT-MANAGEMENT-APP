import React from 'react'
import '../navbar/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div>
        <div class="topnav">
  <Link to={'/login'}>login</Link>
  <Link to={'/Signup'}>Signup</Link>
  
</div>
    </div>
  )
}

export default Navbar