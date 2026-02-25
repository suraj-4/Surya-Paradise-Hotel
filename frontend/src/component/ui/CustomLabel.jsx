
function CustomLabel({children,htmlFor ,className=""}) {
  return (
    <label htmlFor={htmlFor} className={`mb-2 font-medium ${className}`}>
      {children}
    </label>
  )
}

export default CustomLabel;
