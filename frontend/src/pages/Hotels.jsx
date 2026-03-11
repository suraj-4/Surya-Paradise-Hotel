import React, { useState } from 'react'
import { Table, Input, Card, Dropdown, Button, Upload } from "antd";
import PageHeading from '@/component/ui/PageHeading'
import { Import, MoreVertical, Search } from 'lucide-react';
import ImportExport from '@/component/share/ImportExport';
import ImportExportIcon from '@/component/share/importExportIcon';

function Hotels() {
  const [searchText, setSearchText] = useState("");
  
  // Dummy Hotel Data
  const data = [
    {key: "1", name: "Surya Paradise Hotel", city: "Kolkata", rooms: 25, rating: 4.2,},
    {key: "2", name: "Ocean View Resort", city: "Goa", rooms: 40, rating: 4.5,},
    {key: "3", name: "Mountain Retreat", city: "Manali", rooms: 18, rating: 4.0,},
    {key: "4", name: "City Comfort Inn", city: "Delhi", rooms: 30, rating: 3.8,},
    {key: "5", name: "Royal Palace Hotel", city: "Jaipur", rooms: 50, rating: 4.6,},
    {key: "6", name: "Ramada Inn", city: "Kolkata", rooms: 25, rating: 4.2,},
    {key: "7", name: "Laxmi Resort", city: "Goa", rooms: 40, rating: 4.5,},
    {key: "8", name: "Luxury Resort", city: "Manali", rooms: 18, rating: 4.0,},
    {key: "9", name: "Dad's Inn", city: "Delhi", rooms: 30, rating: 3.8,},
    {key: "10", name: "Babu's Palace Hotel", city: "Jaipur", rooms: 50, rating: 4.6,},
  ];

  // Table Columns
  const columns = [
    {title: "Hotel Name", dataIndex: "name", key: "name",},
    {title: "City", dataIndex: "city", key: "city",},
    {title: "Rooms", dataIndex: "rooms", key: "rooms",},
    {title: "Rating", dataIndex: "rating", key: "rating",},
  ];

  // Filter Logic
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.city.toLowerCase().includes(searchText.toLowerCase())
  );

  // const { handleExport, uploadProps } = ImportExport({
  //   data,
  //   onImport: (importedData) => {
  //     console.log("Imported:", importedData);
  //   },
  //   fileName: "hotels",
  // });

  // const items = [
  //   {
  //     key: "import",
  //     label: (
  //       <Upload {...uploadProps}>
  //         Import
  //       </Upload>
  //     ),
  //     icon: <Import size={20} />,
  //   },
  //   {
  //     key: "export",
  //     label: "Export",
  //     icon: <Import size={20} className="rotate-180" />,
  //     onClick: handleExport,
  //   },
  // ];

  return (
    <>
      <PageHeading title="Hotels"/>

      <Card>
        <div className='flex justify-between !mb-4'>
          <Input
            placeholder="Search hotel or city..."
            className='!w-[300px] !py-2'
            prefix={<Search className='text-black'/>}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <Dropdown menu={{ items }} trigger={["click"]}>
            <Button className='border-0 shadow-0'>
              <MoreVertical size={20} />
            </Button>
          </Dropdown> */}
          <ImportExportIcon data={data} fileName="hotels"/>
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

export default Hotels
