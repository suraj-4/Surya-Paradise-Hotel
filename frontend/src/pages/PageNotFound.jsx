import CustomLink from '@/component/ui/CustomLink';
import { Card } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <Card style={{ margin: '50px auto', maxWidth: 600, textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <CustomLink to="/dashboard" classname="FillableBtn block rounded-[8px] inline-block mt-2 font-semibold px-5 py-3">Go to Dashboard</CustomLink>
    </Card>
  )
}


export default PageNotFound;