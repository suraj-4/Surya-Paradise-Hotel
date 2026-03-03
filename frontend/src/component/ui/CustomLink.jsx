import React from 'react'
import { Link } from 'react-router-dom';

function CustomLink({ children, to, classname }) {
  return (
    <Link to={to} className={`FillableBtn ${classname}`}>
      {children}
    </Link>
  )
}


export default CustomLink;