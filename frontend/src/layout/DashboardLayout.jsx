import DashboardHeader from "@/component/layout/DashboardHeader";
import DashboardSidebar from "@/component/layout/DashboardSidebar";
import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen flex">
      <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed}/>

      <Layout className="h-screen overflow-y-hidden">
        <DashboardSidebar collapsed={collapsed} />
        <Content className="w-full p-5 overflow-y-auto ">
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default DashboardLayout;