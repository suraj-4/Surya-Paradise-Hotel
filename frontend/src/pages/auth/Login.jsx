import React, { useState } from 'react'
import { Card, Form, message } from 'antd';
import CustomInput from '../../component/ui/CustomInput';
import CustomLabel from '../../component/ui/CustomLabel';
import { Mail, User, LockKeyhole } from 'lucide-react';
import FillableBtn from '../../component/ui/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/authApi';

function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser(formData);

      // save token
      localStorage.setItem("token", res.token);

      message.success("Login successful");

      // redirect dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      if (error.errors) {
        setErrors(error.errors); // Laravel validation
      } else {
        message.error(error.message || "Login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[var(--primary)]">
      <div className='flex items-center justify-center h-full'>
        <Card className='lg:w-1/3 md:w-1/2 w-full bg-transparent'>
          <h1 className='text-center'>Sign In</h1>
          <Form layout='vertical' onFinish={handleLogin}>
            {/* EMAIL */}
            <div className="mb-5">
              <CustomLabel htmlFor="email">Email</CustomLabel>
              <CustomInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                prefix={<Mail className="text-gray-300" />}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email[0]}
                </p>
              )}
            </div>
            {/* PASSWORD */}
            <div className="mb-5">
              <CustomLabel htmlFor="password">Password</CustomLabel>
              <CustomInput
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                prefix={<LockKeyhole className="text-gray-300" />}
              />

              {errors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <div className="mb-5">
              <FillableBtn className='w-full uppercase !py-3' htmlType='submit' disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </FillableBtn>
            </div>
          </Form>
          <hr className='border-gray-300'/>
          <p className='text-gray-500 text-center !my-2'>Don't have an account yet? <Link to="/auth/signup" className='!text-[var(--tertiary)] !font-semibold'> Sign Up</Link></p>
        </Card>
      </div>
    </div>
  )
}

export default Login;
