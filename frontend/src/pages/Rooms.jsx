import React, { useState } from 'react'
import PageHeading from '@/component/ui/PageHeading'
import { Button, Card, Dropdown, Input, Table } from 'antd'
import { Edit, Eye, MoreVertical, Search, Trash2 } from 'lucide-react'
import ImportExportIcon from '@/component/share/importExportIcon';

function Rooms() {

  const [searchText, setSearchText] = useState("");
    
    // Dummy Room Data
    const data = [
      { key: "1", room_no: "101", type: "Single", price: 1200, capacity: 1, status: "Available", floor: 1 },
      { key: "2", room_no: "102", type: "Double", price: 2000, capacity: 2, status: "Booked", floor: 1 },
      { key: "3", room_no: "103", type: "Deluxe", price: 3500, capacity: 2, status: "Cleaning", floor: 1 },
      { key: "4", room_no: "201", type: "Single", price: 1300, capacity: 1, status: "Available", floor: 2 },
      { key: "5", room_no: "202", type: "Double", price: 2200, capacity: 2, status: "Booked", floor: 2 },
      { key: "6", room_no: "203", type: "Suite", price: 5000, capacity: 4, status: "Available", floor: 2 },
      { key: "7", room_no: "301", type: "Single", price: 1500, capacity: 1, status: "Available", floor: 3 },
      { key: "8", room_no: "302", type: "Deluxe", price: 3700, capacity: 2, status: "Booked", floor: 3 },
      { key: "9", room_no: "303", type: "Suite", price: 5200, capacity: 4, status: "Cleaning", floor: 3 },
      { key: "10", room_no: "304", type: "Double", price: 2100, capacity: 2, status: "Available", floor: 3 },
    ];
  
    // Table Columns
    const columns = [
      {title: "Room No", dataIndex: "room_no", key: "room_no",},
      {title: "Type", dataIndex: "type", key: "type",},
      {title: "Price (₹)", dataIndex: "price", key: "price",},
      {title: "Capacity", dataIndex: "capacity", key: "capacity",},
      {title: "Floor", dataIndex: "floor", key: "floor",},
      {title: "Status", dataIndex: "status", key: "status", render: (status) => {
        let color = "gray";
        if (status === "Available") {
          color = "green";
        } else if (status === "Booked") {
          color = "blue";
        } else if (status === "Cleaning") {
          color = "orange";
        }
        return <span style={{ color }}>{status}</span>;
      }},
      {title: "Actions", key: "actions",
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
      }
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
    <PageHeading title="Rooms" buttonText="Add Room" to="/rooms/create"/>
    <Card>
      <div className='flex justify-between !mb-4'>
        <Input
          placeholder="Search room..."
          className='!w-[300px] !mb-4 !py-2'
          prefix={<Search className='text-black'/>}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ImportExportIcon data={data} fileName="rooms"/>
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

export default Rooms
