import React from 'react'
import { Card, Form } from 'antd';
import CustomInput from '../../component/ui/CustomInput';
import CustomLabel from '../../component/ui/CustomLabel';
import { Mail, User, LockKeyhole } from 'lucide-react';
import {FillableBtn} from '../../component/ui/CustomButton';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="w-full h-screen bg-[var(--primary)]">
      <div className='flex items-center justify-center h-full'>
        <Card className='lg:w-1/3 md:w-1/2 w-full bg-transparent'>
          <h1 className='text-center'>Sign Up</h1>
          <Form>
            <div className="mb-5">
              <CustomLabel htmlFor="name">Name</CustomLabel>
              <CustomInput name="name" placeholder="Enter your name" prefix={<User className='text-gray-300'/>}/>
            </div>
            <div className="mb-5">
              <CustomLabel htmlFor="email">Email</CustomLabel>
              <CustomInput type='email' id="email" name="email" placeholder="Enter your email" prefix={<Mail className='text-gray-300'/>}/>
            </div>
            <div className="mb-5">
              <CustomLabel htmlFor="password">Password</CustomLabel>
              <CustomInput type='password' id="password" name="password" placeholder="Enter your password" prefix={<LockKeyhole className='text-gray-300'/>}/>
            </div>
            <div className="mb-5">
              <FillableBtn className='w-full uppercase !py-3'>
                Register
              </FillableBtn>
            </div>
          </Form>
          <hr className='border-gray-300'/>
          <p className='text-gray-500 text-center !my-2'> Already have an account? <Link to="/auth/login" className='!text-[var(--tertiary)] !font-semibold'> Sign in</Link></p>
        </Card>
      </div>
    </div>
  )
}

export default SignUp;
