import React from 'react'
import { Button, Form } from 'react-bootstrap';
import api from "../../api/axios";

import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");


  const forgotPassAPI = async (data) => {
    try {
      const response = await api.post("/users/forgot-password", data);
      setSuccess(response.data.success);
      setError("");
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.error || "Something went wrong");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassAPI({ email });
  };


  return (

    <div className="vh-100">
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                     <div className="auth-form">
                        
                        <div className="text-center mb-3">
                          <Link to="/"><h2>Surya Paradice Hotel</h2></Link>
                        </div>
                        <h4 className="text-center mb-4">Forgot Password</h4>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        {loading && <div className="alert alert-info">Loading...</div>}

                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="hello@example.com"
                              autoComplete="username"
                            />
                          </Form.Group>

                          <div className="text-center">
                            <Button 
                              type="submit" 
                              variant="primary" 
                              className="w-100"
                            >
                              SUBMIT
                            </Button>
                          </div>
                        </Form>
                        
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
