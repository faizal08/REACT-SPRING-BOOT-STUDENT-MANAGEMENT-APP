import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
  
      <header>
        <h1>ADMIN DASHBOARD</h1>
      </header>
      <main>
        {/* Add any content you want here */}
      </main>
      <footer>
        <button className="button"><Link to={'/userlist'}>Students List</Link></button>
      </footer>
    </div>
  );
}

export default AdminDashboard;
