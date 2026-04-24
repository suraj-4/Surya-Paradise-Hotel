import React, { useState } from 'react'
import ImportExportIcon from '@/component/share/ImportExportIcon'
import PageHeading from '@/component/ui/PageHeading'
import { Card, Input, Table } from 'antd'
import { Search } from 'lucide-react'

function BillingList() {
  const [searchText, setSearchText] = useState("");
    
    // Dummy Hotel Data
    const data = [
      {key: "1", invoice_no: "INV-1001", customer: "Ramesh Kumar", city: "Kolkata", amount: 25000, gst: 18, total_amount: 29500, status: "Paid", date: "2026-04-01" },
      {key: "2", invoice_no: "INV-1002", customer: "Bipin Sharma", city: "Goa", amount: 42000, gst: 18, total_amount: 49560, status: "Pending", date: "2026-04-02"},
      {key: "3", invoice_no: "INV-1003", customer: "Sachin Tendulkar", city: "Manali", amount: 18000, gst: 12, total_amount: 20160, status: "Paid", date: "2026-04-03"},
      {key: "4", invoice_no: "INV-1004", customer: "Rahul Das", city: "Delhi", amount: 30000, gst: 18, total_amount: 35400, status: "Overdue", date: "2026-04-04" },
      {key: "5", invoice_no: "INV-1005", customer: "Binay Kumar", city: "Jaipur", amount: 50000, gst: 18, total_amount: 59000, status: "Paid", date: "2026-04-05" },
      {key: "6", invoice_no: "INV-1006", customer: "Surya", city: "Kolkata", amount: 27000, gst: 18, total_amount: 31860, status: "Pending", date: "2026-04-06"},
      {key: "7", invoice_no: "INV-1007", customer: "Ravi Thakur", city: "Goa", amount: 39000, gst: 18, total_amount: 46020, status: "Overdue", date: "2026-04-07" },    
      {key: "8", invoice_no: "INV-1008", customer: "Neha Gupta", city: "Manali", amount: 22000, gst: 18, total_amount: 25960, status: "Pending", date: "2026-04-08" },
      {key: "9", invoice_no: "INV-1009", customer: "Niraj Singh", city: "Delhi", amount: 31000, gst: 18, total_amount: 36580, status: "Overdue", date: "2026-04-09" },
      {key: "10", invoice_no: "INV-1010", customer: "Dhiraj Patel", city: "Jaipur", amount: 52000, gst: 18, total_amount: 61360, status: "Paid", date: "2026-04-10"}
    ];
  
    // Table Columns
    const columns = [
      {title: "Invoice No", dataIndex: "invoice_no", key: "invoice_no",},
      {title: "Customer", dataIndex: "customer", key: "customer",},
      {title: "City", dataIndex: "city", key: "city",},
      {title: "Amount", dataIndex: "amount", key: "amount",},
      {title: "GST", dataIndex: "gst", key: "gst",},
      {title: "Total Amount", dataIndex: "total_amount", key: "total_amount",},
      {title: "Status", dataIndex: "status", 
        key: "status",
        render: (text) => {
          let color = "gray";
          if (text === "Paid") {
            color = "green";
          } else if (text === "Pending") {
            color = "orange";
          } else if (text === "Overdue") {
            color = "red";
          }
          return <span className={`px-2 py-1 rounded-[6px] text-white text-xs`} style={{ backgroundColor: color }}>{text}</span>;
        }
      },
      {title: "Date", dataIndex: "date", key: "date",},
    ];
  
    // Filter Logic
    const filteredData = data.filter(
      (item) =>
        item.invoice_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchText.toLowerCase()) ||
        item.city.toLowerCase().includes(searchText.toLowerCase())||
        item.total_amount.toString().toLowerCase().includes(searchText.toLowerCase())
    );


  return (
    <>
      <PageHeading title="Billing" buttonText="Generate Bill" to="/billings/generate"/>

      <Card>
        <div className='flex justify-between !mb-4'>
          <Input
            placeholder="Search Invoice No, customer, city or total amount..."
            className='!w-[300px] !py-2'
            prefix={<Search className='text-black'/>}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ImportExportIcon data={data} fileName="invoices"/>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showQuickJumper: false,
            showTotal: (total) => `Total ${total} invoices`,
          }}
        />
      </Card>
    </>
  )
}

export default BillingList
