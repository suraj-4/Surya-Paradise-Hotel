
import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, user: currentUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  

  React.useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const loginAPI = async (data) => {
    try {
      const response = await api.post("/users/login", data);
      const { user, token } = response.data;
      login(user, token); 
    } catch (error) {
      setError("Invalid credentials");
      // console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAPI({ email, password });
  };

return (
    <div className="vh-100">
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="auth-form">
            <div className="text-center mb-3 text-primary">
              <Link to="/"><h2>Surya Paradice Hotel</h2></Link>
            </div>
            <h4 className="text-center mb-4">Sign in your account</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                  placeholder="hello@example.com"
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                />
                <Button
                  variant="link"
                  className="position-absolute btn-link eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ border: 'none', background: 'none' }}
                >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
                </Button>
                </div>
              </Form.Group>

              <div className="form-row d-flex justify-content-between mt-4 mb-2">
                <div className="mb-3">
                  <div className="form-check custom-checkbox ms-0">
                    <input type="checkbox" className="form-check-input" id="remember"/>
                    <label className="form-check-label" for="remember">Remember my preference</label>
                  </div>
                </div>
                <div className="mb-3 mt-1">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>

              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
            <div className="new-account mt-3">
              <p className="mb-0 mb-sm-3">Don't have an account? <Link to="/register" className="text-primary">Sign up</Link></p>
            </div>
            <div className="bg-grey text-center mt-2">
              <span>email : user3@gmail.com</span>|<span>password : User@2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
