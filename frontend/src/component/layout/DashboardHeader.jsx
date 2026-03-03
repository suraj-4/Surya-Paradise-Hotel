import { useState } from "react";
import { Layout, Button, Avatar, Input, Dropdown } from "antd";
import CustomInput from "../ui/CustomInput";
import { PanelLeftClose, PanelLeftOpen, Search, 
  Mail, Bell, X, SearchIcon, Badge } from "lucide-react";


const { Header } = Layout;

const mailItems = [
  {key: "1",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">New Booking</span>
        <span className="text-[14px] text-gray-500">
          Room 204 booked successfully
        </span>
      </div>
    ),
  },
  {key: "2",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">Payment Received</span>
        <span className="text-[14px] text-gray-500">
          ₹5,000 received from guest
        </span>
      </div>
    ),
  },
  {key: "3",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">New Staff Added</span>
        <span className="text-[14px] text-gray-500">
          Receptionist account created
        </span>
      </div>
    ),
  },
  {key: "4",
    label: (
      <div className="text-center text-[var(--primary)] font-medium">
        View All Email
      </div>
    ),
  },
];

const notificationItems = [
  {key: "1",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">Room Cleaning Due</span>
        <span className="text-[14px] text-gray-500">
          Room 305 needs housekeeping
        </span>
      </div>
    ),
  },
  {key: "2",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">Checkout Reminder</span>
        <span className="text-[14px] text-gray-500">
          Guest in Room 102 checking out today
        </span>
      </div>
    ),
  },
  {key: "3",
    label: (
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">Low Inventory Alert</span>
        <span className="text-[14px] text-gray-500">
          Toiletries stock is running low
        </span>
      </div>
    ),
  },
  {key: "4",
    label: (
      <div className="text-center text-[var(--primary)] font-medium border-t border-gray-200 pt-2">
        View All Notifications
      </div>
    ),
  },
];

const DashboardHeader = ({ collapsed, setCollapsed }) => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <Header className="custom_tertiary_bg flex items-center !px-5">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="public/img/hotel-logo-small.png"
              alt="Hotel Logo"
              style={{
                width: collapsed ? "40px" : "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />

            {!collapsed && (
              <span className="text-white font-bold text-[20px]">
                Hotel Admin
              </span>
            )}
          </div>
          <Button type="text"  className="collapsed_btn hover:!bg-transparent focus:bg-transparent active:bg-transparent"
          icon={collapsed ? <PanelLeftClose className="!text-white"/> : <PanelLeftOpen className="!text-white" />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <h2 className="text-white font-medium">Welcome, Surya ji</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center transition-all duration-300">
            {openSearch && (
              <CustomInput
                autoFocus
                prefix={< SearchIcon size={18} className="text-gray-500" />}
                placeholder="Search here..."
                className="!w-100 !mr-2"
                suffix={
                  <X size={16} className="cursor-pointer" onClick={() => setOpenSearch(false)}/>
                }
              />
            )}

            <div onClick={() => setOpenSearch(true)}
              className="w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-[var(--secondary)] transition"
            >
              <Search size={18} className="text-white" />
            </div>
          </div>

          <Dropdown
            menu={{ items: mailItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="relative w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-[var(--secondary)] transition">
              <Mail size={18} className="text-white" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
          </Dropdown>

          <Dropdown
            menu={{ items: notificationItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="relative w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer hover:bg-[var(--secondary)] transition">
              <Bell size={18} className="text-white" />
            </div>
          </Dropdown>
          
          <Avatar
            size={40}
            src="https://i.pravatar.cc/150?img=12"
            className="ml-2"
          />
        </div>
      </div>
      
    </Header>
  );
};

export default DashboardHeader;