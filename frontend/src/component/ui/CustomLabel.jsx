
function CustomLabel({children,htmlFor ,className=""}) {
  return (
    <label htmlFor={htmlFor} className={`mb-2 font-medium cursor-pointer ${className}`}>
      {children}
    </label>
  )
}

export default CustomLabel;
