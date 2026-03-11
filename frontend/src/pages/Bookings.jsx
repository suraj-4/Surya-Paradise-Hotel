import React, { useState } from 'react'
import PageHeading from '@/component/ui/PageHeading'
import { Badge, Button, Card, Dropdown, Input, Table, Tag } from 'antd'
import { Edit, Eye, MoreVertical, Search, Trash2 } from 'lucide-react'
import ImportExportIcon from '@/component/share/importExportIcon';


function Bookings() {
  const [searchText, setSearchText] = useState("");
  
  const data = [
    { key: "1", booking_id: "BK101", guest: "Rahul Sharma", room_no: "101", check_in: "2026-03-01", check_out: "2026-03-03", guests: 1, total: 2400, status: "Confirmed", payment_status: "Paid" },
    { key: "2", booking_id: "BK102", guest: "Amit Verma", room_no: "102", check_in: "2026-03-02", check_out: "2026-03-05", guests: 2, total: 6000, status: "Pending", payment_status: "Pending" },
    { key: "3", booking_id: "BK103", guest: "Priya Singh", room_no: "201", check_in: "2026-03-04", check_out: "2026-03-06", guests: 2, total: 2600, status: "Confirmed", payment_status: "Paid" },
    { key: "4", booking_id: "BK104", guest: "John Doe", room_no: "203", check_in: "2026-03-05", check_out: "2026-03-08", guests: 3, total: 15000, status: "Pending", payment_status: "Pending" },
    { key: "5", booking_id: "BK105", guest: "Riya Das", room_no: "302", check_in: "2026-03-06", check_out: "2026-03-09", guests: 2, total: 11100, status: "Cancelled", payment_status: "Refunded" },
    { key: "6", booking_id: "BK106", guest: "Arjun Patel", room_no: "303", check_in: "2026-03-07", check_out: "2026-03-10", guests: 4, total: 15600, status: "Confirmed", payment_status: "Paid" },
  ];

  const columns = [
    { title: "Booking ID", dataIndex: "booking_id", key: "booking_id" },
    { title: "Guest Name", dataIndex: "guest", key: "guest" },
    { title: "Room No", dataIndex: "room_no", key: "room_no" },
    { title: "Check In", dataIndex: "check_in", key: "check_in" },
    { title: "Check Out", dataIndex: "check_out", key: "check_out" },
    { title: "Guests", dataIndex: "guests", key: "guests" },
    { title: "Total (₹)", dataIndex: "total", key: "total" },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status) => {
        let color = "default";

        if (status === "Paid") color = "green";
        else if (status === "Pending") color = "orange";
        else if (status === "Refunded") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gray";

        if (status === "Confirmed") color = "green";
        else if (status === "Pending") color = "orange";
        else if (status === "Cancelled") color = "red";

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
      item.room_no.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase())
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

  return (
    <>
    <PageHeading title="Bookings" buttonText="Add Booking" to="/bookings/create"/>
    <Card>
      <div className='flex justify-between'>
        <Input
          placeholder="Search bookings..."
          className='!w-[300px] !mb-4 !py-2'
          prefix={<Search className='text-black'/>}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ImportExportIcon data={data} fileName="bookings"/>
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

export default Bookings
