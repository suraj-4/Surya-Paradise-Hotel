import { Button } from 'antd'

export default function FillableBtn({className="", children, ...props}) {
  return (
    <Button className={`FillableBtn !text-[18px] !font-bold !px-5 !py-6 rounded ${className}`} {...props}>
      {children}
    </Button>
  )
}
