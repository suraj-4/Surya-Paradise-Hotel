import CustomInput from '@/component/ui/CustomInput';
import CustomLabel from '@/component/ui/CustomLabel';
import PageHeading from '@/component/ui/PageHeading';
import { useState, useEffect } from "react";
import { Form, Select } from "antd";
import dayjs from "dayjs";
import FillableBtn from '@/component/ui/CustomButton';

function GenerateBill() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      gstin: "",
      roomNo: "",
      checkIn: "",
      checkOut: "",
      nights: 0,
      roomCharge: 0,
      extras: 0,
      discount: 0,
      gstRate: 0,
      gstAmount: 0,
      total: 0,
    });

    const [items, setItems] = useState([
      { name: "", rate: "", qty: 1 }
    ]);

  // 🔁 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📅 Calculate Nights
    useEffect(() => {
      if (formData.checkIn && formData.checkOut) {
        const nights = dayjs(formData.checkOut).diff(
          dayjs(formData.checkIn),
          "day"
        );
        setFormData((prev) => ({ ...prev, nights: nights > 0 ? nights : 0 }));
      }
    }, [formData.checkIn, formData.checkOut]);
  
    // 💰 GST Calculation
    useEffect(() => {
      const base =
        Number(formData.roomCharge) +
        Number(formData.extras) -
        Number(formData.discount);
  
      let gstRate = 0;
  
      if (base >= 1000 && base <= 7499) gstRate = 12;
      else if (base >= 7500) gstRate = 18;
  
      const gstAmount = (base * gstRate) / 100;
      const total = base + gstAmount;
  
      setFormData((prev) => ({
        ...prev,
        gstRate,
        gstAmount,
        total,
      }));
    }, [formData.roomCharge, formData.extras, formData.discount]);
  
  // 🚀 Submit
  const handleSubmit = () => {
    setLoading(true);
    console.log("Invoice Data:", formData);
    setTimeout(() => setLoading(false), 1000);
  };

  const hasData =
    formData.name ||
    formData.phone ||
    formData.roomCharge > 0 ||
    formData.extras > 0 ||
    formData.total > 0;


  const roomOptions = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Suite", label: "Suite" },
  ];


  // Add new row
  const handleItemAdd = () => {
    setItems([...items, { name: "", rate: "", qty: 1 }]);
  };

  // Remove row
  const handleItemRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Handle input change
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <>
      <PageHeading title="Generate Bill" />

      <div className="flex gap-10">
        <div className="w-1/2">
          <Form layout="vertical" onFinish={handleSubmit}>
            {/* 🔷 Guest Info */}
            <h5 className="mb-3">Guest Info</h5>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <CustomLabel>Name</CustomLabel>
                <CustomInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Guest Name"
                />
              </div>
              <div className="w-1/2">
                <CustomLabel>Email</CustomLabel>
                <CustomInput
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </div>
              <div className="w-1/2">
                <CustomLabel>Phone</CustomLabel>
                <CustomInput
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            {/* 🔷 Booking Details */}
            <h5 className="mb-3">Booking Details</h5>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <CustomLabel>Room Type</CustomLabel>
                <Select
                  name="roomType"
                  placeholder="Select Room Type"
                  options={roomOptions}
                  value={formData.roomType}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, roomType: value }))
                  }
                  style={{ width: "100%" }}
                  className='!px-3 !py-4 custom_input'
                />
              </div>
              <div className="w-1/2">
                <CustomLabel>Room No</CustomLabel>
                <CustomInput
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <CustomLabel>Nights</CustomLabel>
                <CustomInput value={formData.nights} disabled />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-full">
                <CustomLabel>Check-in</CustomLabel>
                <CustomInput
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="w-full">
                <CustomLabel>Check-out</CustomLabel>
                <CustomInput
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            {/* 🔷 Charges */}
            <h5 className="mb-3">Charges</h5>

            <div className="mb-4 flex gap-4">
              <div className="mb-4 w-1/3">
                <CustomLabel>Room Charge</CustomLabel>
                <CustomInput
                  type="number"
                  name="roomCharge"
                  value={formData.roomCharge}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 w-1/3">
                <CustomLabel>Extra Charges</CustomLabel>
                <CustomInput
                  type="number"
                  name="extras"
                  value={formData.extras}
                  onChange={handleChange}
                  placeholder="Food, Laundry"
                />
              </div>
              <div className="mb-4 w-1/3">
                <CustomLabel>Discount</CustomLabel>
                <CustomInput
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 🔷 Additional Services / Items */}
            <h5 className="mb-3">Additional Services / Items</h5>
            <div className="mb-2">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  {/* Item Name */}
                  <input
                    type="text"
                    placeholder="Item"
                    className="custom_input border p-2 w-1/3"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />

                  {/* Rate */}
                  <input
                    type="number"
                    placeholder="Rate"
                    className="custom_input border p-2 w-1/4"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", e.target.value)
                    }
                  />

                  {/* Quantity */}
                  <input
                    type="number"
                    placeholder="Qty"
                    className="border p-2 w-1/6"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(index, "qty", e.target.value)
                    }
                  />

                  {/* Price (auto) */}
                  <input
                    type="number"
                    className="border p-2 w-1/4 bg-gray-100"
                    value={item.rate * item.qty || 0}
                    readOnly
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => handleItemRemove(index)}
                    className="bg-red-500 text-white px-3"
                  >
                    X
                  </button>
                </div>
              ))}

              {/* Add Button */}
              <FillableBtn className='!py-2' onClick={handleItemAdd}>
                + Add Item
              </FillableBtn>
            </div>

            {/* 🔷 GST Summary */}
            <h5 className="mb-3">GST Summary</h5>

            <div className="mb-2">
              <p>GST %: <strong>{formData.gstRate}%</strong></p>
              <p>GST Amount: ₹{formData.gstAmount}</p>
              <p className="text-lg font-bold">Total: ₹{formData.total}</p>
            </div>

            {/* 🔷 Actions */}
            <div className="flex gap-3 mt-5">
              <FillableBtn className='!py-2' htmlType="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Invoice"}
              </FillableBtn>

              <FillableBtn className='!py-2'
                type="button"
                onClick={() => console.log("Generate PDF")}
              >
                Generate PDF
              </FillableBtn>

              <FillableBtn className='!py-2'
                type="button"
                onClick={() => console.log("Mark as Paid")}
              >
                Mark as Paid
              </FillableBtn>
            </div>
          </Form>

        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
          {hasData && (
            <div className="w-[595px] h-[842px] bg-white p-[30px]">
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h5 className='text-lg !font-bold text-[#005461]'>HOTEL INVOICE</h5>
                  <p><strong>Hotel Name:</strong> Surya Paradise Hotel</p>
                  <p><strong>Address:</strong> 123 Main Street, City, State, ZIP Code</p>
                  <p><strong>Phone:</strong> 123-456-7890</p>
                  <p><strong>Email:</strong> info@suryaparadise.com</p>
                  <p><strong>Website:</strong> https://www.suryaparadise.com</p>
                </div>
                <div className="w-1/2">
                  <img alt="Hotel Logo" src="/public/img/Hotel-Logo-trasparent.png" style={{ width: '100%', height: '126px', objectFit: 'contain' }} />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2">
                  <h5 className='text-lg !font-semibold text-[#005461]'>Guest Details</h5>
                  <p><strong>Customer Name:</strong> {formData.name}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Room No:</strong> {formData.roomNo}</p>
                  <p><strong>Room Type:</strong> {formData.roomType}</p>
                </div>
                <div className="w-1/2">
                  <h5 className='text-lg !font-semibold text-[#005461]'>Invoice Details</h5>
                  <p><strong>Invoice No:</strong> {formData.invoiceNo}</p>
                  <p><strong>Invoice Date:</strong> {formData.invoiceDate}</p>
                  <p><strong>Check-in Date:</strong> {formData.checkIn}</p>
                  <p><strong>Check-out Date:</strong> {formData.checkOut}</p>
                  <p><strong>Total Stay:</strong> {formData.nights} night(s)</p>
                </div>
              </div>
              {/* <hr className="my-3"/> */}
              <table className='w-full border-collapse border border-gray-300 my-4'>
                <thead className='bg-[#005461] text-white'>
                  <tr>
                    <th className='text-center p-3'>Description</th>
                    <th className='text-center p-3'>Rate (₹)</th>
                    <th className='text-center p-3'>Quantity/Days</th>
                    <th className='text-center p-3'>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-center p-3'>Room Charge</td>
                    <td className='text-center p-3'>{formData.roomCharge}</td>
                    <td className='text-center p-3'>{formData.nights}</td>
                    <td className='text-center p-3'>{formData.roomCharge * formData.nights}</td>
                  </tr>

                  {/* 🔽 Dynamic Items */}
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className='text-center p-3'>
                        {item.name || "Item"}
                      </td>
                      <td className='text-center p-3'>
                        {item.rate || 0}
                      </td>
                      <td className='text-center p-3'>
                        {item.qty || 0}
                      </td>
                      <td className='text-center p-3'>
                        {(item.rate * item.qty) || 0}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

              <hr className="my-3"/>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <p><strong>Extras:</strong></p>
                  <p><strong>Discount:</strong></p>
                  <p><strong>GST ({formData.gstRate}%):</strong></p>
                
                </div>
                <div className="w-1/2">
                  <p className='text-right'>₹{formData.extras}</p>
                  <p className='text-right'>₹{formData.discount}</p>
                  <p className='text-right'>₹{formData.gstAmount}</p>
                </div>
              </div>
              <hr className="my-3"/>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <p className="text-lg font-bold">
                    <strong>Total Amount:</strong> 
                  </p>
                </div>
                <div className="w-1/2">
                  <p className='text-lg font-bold text-right'>₹{formData.total}</p>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GenerateBill;
