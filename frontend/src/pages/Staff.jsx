import React, { useState } from 'react'
import PageHeading from '@/component/ui/PageHeading'
import { Button, Card, Dropdown, Input, Select, Table, Tag } from 'antd';
import { Edit, Eye, MoreVertical, Search, Trash2 } from 'lucide-react';
import ImportExportIcon from '@/component/share/importExportIcon';

function Staff() {
  const [searchText, setSearchText] = useState("");
  
  const data = [
    { key: "1", staff_id: "ST101", name: "Rahul Sharma", phone: "9876543210", shift: "Morning", salary: 35000, role: "Manager", status: "Active" },
    { key: "2", staff_id: "ST102", name: "Amit Verma", phone: "9123456780", shift: "Evening", salary: 20000, role: "Receptionist", status: "Active" },
    { key: "3", staff_id: "ST103", name: "Priya Singh", phone: "9988776655", shift: "Morning", salary: 18000, role: "Housekeeping", status: "On Leave" },
    { key: "4", staff_id: "ST104", name: "John Doe", phone: "9871234567", shift: "Night", salary: 30000, role: "Chef", status: "Active" },
    { key: "5", staff_id: "ST105", name: "Riya Das", phone: "9012345678", shift: "Morning", salary: 15000, role: "Cleaner", status: "Inactive" },
    { key: "6", staff_id: "ST106", name: "Arjun Patel", phone: "9090909090", shift: "Night", salary: 17000, role: "Security", status: "Active" },
  ];

  const columns = [
    { title: "Staff ID", dataIndex: "staff_id", key: "staff_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    { title: "Salary (₹)", dataIndex: "salary", key: "salary" },
    { title: "Role", dataIndex: "role", key: "role" },
    {title: "Assign Role",
      dataIndex: "assign_role",
      key: "assign_role",
      render: (assign_role, record) => (
        <Select
          defaultValue={assign_role}
          className="w-[140px]"
          placeholder="Assign Role"
          onChange={(value) => handleRoleChange(value, record)}
          options={[
            { value: "Admin", label: "Admin" },
            { value: "Manager", label: "Manager" },
            { value: "Staff", label: "Staff" },
          ]}
        />
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";

        if (status === "Active") color = "green";
        else if (status === "On Leave") color = "orange";
        else if (status === "Inactive") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const items = [
          {
            key: "view",
            label: "View",
            icon: <Eye />,
            onClick: () => handleView(record),
          },
          {
            key: "edit",
            label: "Edit",
            icon: <Edit />,
            onClick: () => handleEdit(record),
          },
          {
            key: "delete",
            label: "Delete",
            icon: <Trash2 />,
            danger: true,
            onClick: () => handleDelete(record.key),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button type="text" icon={<MoreVertical />} />
          </Dropdown>
        );
      },
    },
  ];

  // Filter Logic
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (record) => {
    console.log("View:", record);
  };
  const handleEdit = (record) => {
    console.log("Edit:", record);
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleRoleChange = (value, record) => {
    console.log("Selected Role:", value);
    console.log("Row Data:", record);
  };

  return (
    <>
    <PageHeading title="Staff"/>

    <Card>
      <div className='flex justify-between'>
        <Input
          placeholder="Search staff by name or role..."
          className='!w-[300px] !mb-4 !py-2'
          prefix={<Search className='text-black'/>}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ImportExportIcon data={data} fileName="staff"/>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showQuickJumper: false,
          showTotal: (total) => `Total ${total} hotels`,
        }}
      />
    </Card>
    </>
  )
}

export default Staff
