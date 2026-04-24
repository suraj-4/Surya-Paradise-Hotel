import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Calculator, CalendarDays, HomeIcon, HotelIcon, LayoutDashboard, LucideFileUser } from "lucide-react";
import FillableBtn from "../ui/CustomButton";

const { Sider } = Layout;

const DashboardSidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider collapsible collapsed={collapsed} trigger={null} className="w-[200px] !h-screen custom_tertiary_bg py-5">
      <Menu
        mode="inline"
        className="h-screen custom_tertiary_bg bg-slate-900 
          [&_.ant-menu-item]:!text-gray-300 
          [&_.ant-menu-item-selected]:!bg-[var(--secondary)] 
          [&_.ant-menu-item-selected]:!text-white 
          [&_.ant-menu-item:hover]:!bg-[var(--secondary)] 
          [&_.ant-menu-item:hover]:!text-white"
        defaultSelectedKeys={["/dashboard"]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
            label: <span className="font-medium">Dashboard</span>,
          },
          {
            key: "/hotels",
            icon: <HotelIcon className="w-5 h-5" />,
            label: <span className="font-medium">Hotels</span>,
          },
          {
            key: "/rooms",
            icon: <HomeIcon className="w-5 h-5" />,
            label: <span className="font-medium">Rooms</span>,
          },
          {
            key: "/bookings",
            icon: <CalendarDays className="w-5 h-5" />,
            label: <span className="font-medium">Bookings</span>,
          },
          {
            key: "/staff",
            icon: <LucideFileUser className="w-5 h-5" />,
            label: <span className="font-medium">Staff</span>,
          },
          {
            key: "/billing",
            icon: <Calculator className="w-5 h-5" />,
            label: <span className="font-medium">Billing</span>,
          },
        ]}
      />
    </Sider>
  );
};

export default DashboardSidebar;