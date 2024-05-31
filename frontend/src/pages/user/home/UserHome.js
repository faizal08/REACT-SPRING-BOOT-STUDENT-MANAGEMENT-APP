import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLogined from "../navbar/NavLogined";
import './UserHome.css'; 

function UserHome() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  useEffect(() => {
    clearAllCookies();
    setToken(localStorage.getItem('token'));
  }, []);

  if (!token) {
    navigate('/login');
  }

  return (
    <>
      <NavLogined />
      <div className="home-container">
        {token && (
          <div className="home-content">
            <div className="home-header">
              <h4>
                <strong>WELCOME STUDENT</strong>
              </h4>
            </div>
            <div className="home-text">
              <p>
                Welcome to our website! We are delighted to have you here, and we extend our warmest greetings as you embark on a journey through our digital domain...
              </p>
              <Link type="button" className="btn btn-outline-dark" to="/profile">
                View Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserHome;

