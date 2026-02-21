import React from 'react'
import api from "../../api/axios";
import { useLogout } from "../../../handle/logout";

function Profile() {
    const [userData, setUserData] = React.useState(null);
    const handleLogout = useLogout();

    React.useEffect(() => {
    if (token) {
      api
        .get("/users/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUserData(res.data))
        .catch((err) => setUserData(null));
    }
  }, [token]);

  
  return (
    <div className='card'>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Profile</h3>
        <button className="btn btn-warning">Edit</button>
        <button
          onClick={handleLogout}
          className="btn btn-danger shadow-none">
          Logout
        </button>
      </div>
      <div className="card-body">
        <h3 className="h6 mb-3 text-secondary">Your Profile:</h3>
        {userData ? (
          <div>
            {/* <pre className="bg-light p-2 rounded text-dark overflow-auto small mb-3">{JSON.stringify(userData, null, 2)}</pre> */}
            <div className="row mb-3">
              <div className="col-md-6 mb-2"><span className="fw-bold">Name:</span> {user.name}</div>
              <div className="col-md-6 mb-2"><span className="fw-bold">Email:</span> {user.email || "Not provided"}</div>
              <div className="col-md-6 mb-2"><span className="fw-bold">Phone:</span> {user.phone || "Not provided"}</div>
              <div className="col-md-6 mb-2"><span className="fw-bold">Role:</span> {user.role?.toUpperCase() || "Not provided"}</div>
            </div>
            <div className={`alert ${userData.success ? "alert-success" : "alert-danger"} mt-3`}>
              <strong>Status:</strong> {userData.success}
            </div>
          </div>
        ) : (
          <span className="text-muted">Loading or not authorized...</span>
        )}
      </div>
    </div>
  )
}

export default Profile;


<div className='card'>
  
</div>
