import { Plus } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

function PageHeading({ title, buttonText, className, to, btnClassName }) {
  return (
    <div className="pb-4 border-b border-black flex items-center justify-between">
      <h1 className={`text-gray-800 text-xl font-semibold ${className}`}>
        {title}
      </h1>

      {to && buttonText && (
        <Link to={to} className={`FillableBtn px-3 py-2 rounded text-[16px] font-medium ${btnClassName}`}>
            {buttonText}
            <Plus className="w-4 h-4 ml-2 inline-block" />
        </Link>
      )}
    </div>
  );
}


export default PageHeading;