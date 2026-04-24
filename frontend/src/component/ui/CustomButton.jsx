import { Button } from 'antd'

export default function FillableBtn({className="", children, ...props}) {
  return (
    <Button className={`FillableBtn !h-auto !text-[18px] !font-semibold rounded ${className}`} {...props}>
      {children}
    </Button>
  )
}
