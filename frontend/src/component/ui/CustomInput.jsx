import { Input } from 'antd';

function CustomInput({type="text", name, Placeholder="hello", className="",prefix, ...props}) {
  return (
    <Input 
      type={type} 
      name={name}
      placeholder={Placeholder} 
      prefix={prefix}
      className={`!px-3 !py-4 custom_input ${className}`}
      {...props}
    />
  )
}
export default CustomInput;
