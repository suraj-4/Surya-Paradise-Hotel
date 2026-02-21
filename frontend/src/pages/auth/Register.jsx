import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from "../../api/axios";

function Register() {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState("");

    React.useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);


    const registerAPI = async (data) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post("/users/register", data);
            
            // Show success message and redirect to login
            setSuccess("Registration successful! Redirecting to login...");
            setError("");
            setLoading(false);
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            // console.error("Registration error:", error);

            // No response (network / server down)
            if (!error.response) {
            setError("Network error. Please check your connection.");
            return;
            }

            const { status, data } = error.response;

            // 400 - Missing email or password
            if (status === 400) {
            setError(data.error || "Email and password are required.");
            return;
            }

            // 409 - Email already exists
            if (status === 409) {
            setError(data.error || "Email already exists.");
            return;
            }

            // 422 - Validation errors
            if (status === 422) {
            const errors = data.errors;
            if (errors && typeof errors === "object") {
                const messages = Object.values(errors).flat().join(", ");
                setError(messages);
            } else {
                setError("Validation failed. Please check your input.");
            }
            return;
            }

            // 500 - Server error
            if (status === 500) {
            setError(data.message || "Server error. Please try again later.");
            return;
            }

            // Fallback
            setError("Registration failed. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerAPI({ name, email, password });
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
                                            <h4 className="text-center mb-4">Sign up your account</h4>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="form-control"
                                                placeholder="Username"
                                                autoComplete="name"
                                                />
                                                </Form.Group>

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

                                                {success && (
                                                    <Alert variant="success" className="text-center">
                                                        {success}
                                                    </Alert>
                                                )}

                                                {error && (
                                                    <Alert variant="danger" className="text-center">
                                                        {error}
                                                    </Alert>
                                                )}

                                                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                                                    {loading ? "Registering..." : "Register"}
                                                </Button>
                                            </Form>
                                            <div className="new-account mt-3">
                                                <p className="mb-0 mb-sm-3">Already have an account? <Link className="text-primary" to="/login">Sign in</Link></p>
                                            </div>
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


export default Register;
