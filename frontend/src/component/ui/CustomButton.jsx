import { Button } from 'antd'

export function FillableBtn({className="", children, ...props}) {
  return (
    <Button className={`FillableBtn !h-auto !text-[18px] !font-semibold rounded ${className}`} {...props}>
      {children}
    </Button>
  )
}

export function FillableBtnSmall({className="", children, ...props}) {
  return (
    <Button className={`FillableBtnSmall !h-auto !text-[14px] !font-semibold rounded ${className}`} {...props}>
      {children}
    </Button>
  )
}
