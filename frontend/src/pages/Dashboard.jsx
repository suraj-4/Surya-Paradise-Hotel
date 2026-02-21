
import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../handle/logout";



function Dashboard() {
  const handleLogout = useLogout();

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow w-100" style={{ maxWidth: '600px' }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h1 className="h4 text-success mb-0">Dashboard</h1>
          <Link to="/profile">Profile</Link>
          <button
            onClick={handleLogout}
            className="btn btn-danger shadow-none">
            Logout
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
