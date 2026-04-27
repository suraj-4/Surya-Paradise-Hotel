import CustomInput from '@/component/ui/CustomInput';
import CustomLabel from '@/component/ui/CustomLabel';
import PageHeading from '@/component/ui/PageHeading';
import { useState, useEffect } from "react";
import { Form, Select } from "antd";
import dayjs from "dayjs";
import {FillableBtn, FillableBtnSmall} from '@/component/ui/CustomButton';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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
      hourlyRate: "",
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
  // 🔥 Check mode
const isHourly =
  formData.checkIn &&
  formData.checkOut &&
  formData.checkIn === formData.checkOut;

// 🔥 Calculate Hours (ONLY for hourly mode)
const calculateHours = () => {
  if (
    isHourly &&
    formData.checkInTime &&
    formData.checkOutTime
  ) {
    const start = new Date(`1970-01-01T${formData.checkInTime}`);
    const end = new Date(`1970-01-01T${formData.checkOutTime}`);

    const diff = (end - start) / (1000 * 60 * 60);

    return diff > 0 ? Math.ceil(diff) : 0; // 🔥 round up
  }
  return 0;
};

const duration = isHourly
  ? calculateHours()
  : Number(formData.nights || 0);

// 🔥 Calculate Nights (ONLY for daily mode)
useEffect(() => {
  if (
    formData.checkIn &&
    formData.checkOut &&
    formData.checkIn !== formData.checkOut
  ) {
    const nights = dayjs(formData.checkOut).diff(
      dayjs(formData.checkIn),
      "day"
    );

    setFormData((prev) => ({
      ...prev,
      nights: nights > 0 ? nights : 0,
    }));
  }
}, [formData.checkIn, formData.checkOut]);

// 🔥 Items Total
const itemsTotal = items.reduce((sum, item) => {
  const rate = Number(item.rate) || 0;
  const qty = Number(item.qty) || 0;
  return sum + rate * qty;
}, 0);

// 💰 GST + Total Calculation
useEffect(() => {
  // ✅ Room Total (Hourly or Daily)
  const roomTotal = isHourly
    ? calculateHours() * Number(formData.hourlyRate || 0)
    : Number(formData.roomCharge || 0) *
      Number(formData.nights || 0);

  // ✅ Base amount
  let base =
    roomTotal +
    itemsTotal -
    Number(formData.discount || 0);

  // 🔥 Prevent negative
  base = base > 0 ? base : 0;

  // ✅ GST slab
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
  }, [
    formData.roomCharge,
    formData.hourlyRate,     // 🔥 IMPORTANT
    formData.nights,
    formData.checkIn,
    formData.checkOut,
    formData.checkInTime,    // 🔥 IMPORTANT
    formData.checkOutTime,   // 🔥 IMPORTANT
    formData.discount,
    items,
  ]);

  // Check-Out Input min date logic
  const getToday = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };


  // 🚀 Submit
  const handleSubmit = () => {
    setLoading(true);

    const itemsTotal = items.reduce((sum, item) => {
      return sum + (Number(item.rate) || 0) * (Number(item.qty) || 0);
    }, 0);

    const invoiceData = {
      ...formData,
      items,          // ✅ include all items
      itemsTotal,     // ✅ optional but useful
    };

    console.log("Invoice Data:", invoiceData);

    // 👉 API call / DB save here
    // axios.post("/api/invoice", invoiceData)

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

  // Generate PDF
  const handleGeneratePDF = async () => {
    const element = document.getElementById("invoice-pdf");

    const canvas = await html2canvas(element, {
      scale: 3, // 🔥 high quality
      useCORS: true, // 🔥 for images (logo fix)
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [595, 842], // exact A4 size
    });

    pdf.addImage(imgData, "PNG", 0, 0, 595, 842);

    pdf.save(`Invoice_${formData.name}_${formData.invoiceNo || Date.now()}.pdf`);
  };

  // Auto-generate Invoice Number
  const generateInvoiceNo = () => {
    const date = new Date();

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const random = Math.floor(100 + Math.random() * 900); // 3 digit

    return `INV-${yyyy}${mm}${dd}-${random}`;
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    setFormData((prev) => ({
      ...prev,
      invoiceNo: prev.invoiceNo || generateInvoiceNo(),
      invoiceDate: prev.invoiceDate || today,
    }));
  }, []);

  // invoice PDF data style
  const th = {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
  };

  const td = {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
  };

  const row = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
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
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <CustomLabel>Address</CustomLabel>
                <CustomInput
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
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
                  min={new Date().toISOString().split("T")[0]}
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
                  min={formData.checkIn || getToday()}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">

              {formData.checkIn &&
              formData.checkOut &&
              formData.checkIn === formData.checkOut && (
                <div className="flex gap-2">
                  {/* Check-in Time */}
                  <div className="mb-4 w-1/3">
                    <CustomLabel>Check-in Time</CustomLabel>
                    <CustomInput
                      type="time"
                      name="checkInTime"
                      value={formData.checkInTime}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  {/* Check-out Time */}
                  <div className="mb-4 w-1/3">
                    <CustomLabel>Check-out Time</CustomLabel>
                    <CustomInput
                      type="time"
                      name="checkOutTime"
                      value={formData.checkOutTime}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  {/* Hourly Rate */}
                  <div className="mb-4 w-1/3">
                    <CustomLabel>Hourly Rate</CustomLabel>
                    <CustomInput
                      type="number"
                      name="hourlyRate"
                      placeholder="Hourly Rate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 🔷 Charges */}
            <h5 className="mb-3">Charges</h5>

            <div className="mb-4 flex gap-4">
              <div className="mb-4 w-1/2">
                <CustomLabel>Room Charge</CustomLabel>
                <CustomInput
                  type="number"
                  name="roomCharge"
                  value={formData.roomCharge}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 w-1/2">
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
                  <div className="w-1/3"> 
                    <label htmlFor={`item-name-${index}`}>Item</label>
                    <input
                      type="text"
                      id={`item-name-${index}`}
                      placeholder="Item"
                      className="small_custom_input p-2 w-full"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  {/* Rate */}
                  <div className="w-1/3">
                    <label htmlFor={`item-rate-${index}`}>Rate</label>
                    <input
                      type="number"
                      id={`item-rate-${index}`}
                      placeholder="Rate"
                      className="small_custom_input p-2 w-full"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(index, "rate", e.target.value)
                      }
                    />
                  </div>

                  {/* Quantity */}
                  <div className="w-1/3">
                    <label htmlFor={`item-qty-${index}`}>Qty</label>
                    <input
                      type="number"
                      id={`item-qty-${index}`}
                      placeholder="Qty"
                      className="small_custom_input p-2 w-full"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(index, "qty", e.target.value)
                      }
                    />
                  </div>

                  {/* Price (auto) */}
                  <div className="w-1/3">
                    <label htmlFor={`item-price-${index}`}>Price</label>
                    <input
                      type="number"
                      id={`item-price-${index}`}
                      className="small_custom_input p-2 w-full bg-gray-100 hover:border-gray-400"
                      value={item.rate * item.qty || 0}
                      readOnly
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleItemRemove(index)}
                    className="bg-red-500 text-white px-3 cursor-pointer rounded hover:bg-red-600 w-[40px] h-[40px] flex items-center justify-center self-end"
                  >
                    X
                  </button>
                </div>
              ))}

              {/* Add Button */}
              <FillableBtnSmall className='!p-[8px]' onClick={handleItemAdd}>
                + Add Item
              </FillableBtnSmall>
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
              <FillableBtn
                className="!py-2"
                htmlType="submit"
                disabled={
                  !formData.name ||
                  duration <= 0 ||
                  (isHourly
                    ? Number(formData.hourlyRate) <= 0
                    : Number(formData.roomCharge) <= 0)
                }
              >
                {loading ? "Saving..." : "Save Invoice"}
              </FillableBtn>

              <FillableBtn
                className="!py-2"
                type="button"
                disabled={
                  !formData.name ||
                  duration <= 0 ||
                  (isHourly
                    ? Number(formData.hourlyRate) <= 0
                    : Number(formData.roomCharge) <= 0)
                }
                onClick={handleGeneratePDF}
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
            <div
              id="invoice-pdf"
              style={{
                width: "595px",
                minHeight: "842px",
                padding: "30px",
                background: "#fff",
                fontFamily: "Montserrat, sans-serif",
                color: "#000",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {/* 🔷 HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <h3 style={{ margin: 0, color: "#005461" }}>Surya Paradise Hotel</h3>
                  <p style={{ margin: 0 }}>123 Main Street, City</p>
                  <p style={{ margin: 0 }}>Phone: 123-456-7890</p>
                  <p style={{ margin: 0 }}>Email: info@suryaparadise.com</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <img
                    src="/img/Hotel-Logo-trasparent.png"
                    alt="Logo"
                    style={{ width: "120px", marginBottom: "10px" }}
                  />
                  <h3 style={{ margin: 0 }}>INVOICE</h3>
                  <p style={{ margin: 0 }}>#{formData.invoiceNo}</p>
                  <p style={{ margin: 0 }}>Date: {formData.invoiceDate}</p>
                </div>
              </div>

              {/* 🔷 CUSTOMER + INVOICE INFO */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <h4 className="custom-heading" style={{ marginBottom: "5px"}}>Bill To</h4>
                  <p style={{ margin: 0 }}><strong>{formData.name}</strong></p>
                  <p style={{ margin: 0 }}>{formData.phone}</p>
                  <p style={{ margin: 0 }}>{formData.email}</p>
                </div>

                <div>
                  <h4 className="custom-heading" style={{ marginBottom: "5px"}}>Stay Details</h4>
                  <p style={{ margin: 0 }}>Room: {formData.roomNo} ({formData.roomType})</p>
                  <p style={{ margin: 0 }}>Check-in: {formData.checkIn}</p>
                  <p style={{ margin: 0 }}>Check-out: {formData.checkOut}</p>
                  <p style={{ margin: 0 }}>
                    {formData.checkIn === formData.checkOut
                      ? `Duration: ${calculateHours()} hrs`
                      : `Nights: ${formData.nights}`}
                  </p>

                  {formData.checkIn === formData.checkOut && (
                    <p style={{ margin: 0 }}>
                      Time: {formData.checkInTime} - {formData.checkOutTime}
                    </p>
                  )}
                </div>

              </div>

              {/* 🔷 TABLE */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                  <tr style={{ background: "#005461", color: "#fff" }}>
                    <th style={th}>Description</th>
                    <th style={th}>Rate</th>
                    <th style={th}>Qty/Day/Hourly</th>
                    <th style={th}>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Room */}
                  <tr>
                    <td style={td}>Room Charge</td>

                    {/* Rate */}
                    <td style={td}>
                      ₹
                      {formData.checkIn === formData.checkOut
                        ? formData.hourlyRate || 0
                        : formData.roomCharge || 0}
                    </td>

                    {/* Qty */}
                    <td style={td}>
                      {formData.checkIn === formData.checkOut
                        ? `${calculateHours()} hrs`
                        : `${formData.nights} nights`}
                    </td>

                    {/* Amount */}
                    <td style={td}>
                      ₹
                      {formData.checkIn === formData.checkOut
                        ? calculateHours() * Number(formData.hourlyRate || 0)
                        : Number(formData.roomCharge || 0) * Number(formData.nights || 0)}
                    </td>
                  </tr>

                  {/* Items */}
                  {items
                    .filter((item) => item.name || item.rate)
                    .map((item, i) => (
                      <tr key={i}>
                        <td style={td}>{item.name}</td>
                        <td style={td}>₹{item.rate}</td>
                        <td style={td}>{item.qty}</td>
                        <td style={td}>₹{item.rate * item.qty}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* 🔷 TOTALS BLOCK */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "250px" }}>
                  <div style={row}>
                    <span>Subtotal</span>
                    <span>₹{formData.total - formData.gstAmount}</span>
                  </div>

                  <div style={row}>
                    <span>Discount</span>
                    <span>₹{formData.discount}</span>
                  </div>

                  <div style={row}>
                    <span>GST ({formData.gstRate}%)</span>
                    <span>₹{formData.gstAmount}</span>
                  </div>

                  <hr />

                  <div style={{ ...row, fontWeight: "bold", fontSize: "16px" }}>
                    <span>Total</span>
                    <span>₹{formData.total}</span>
                  </div>
                </div>
              </div>

              {/* 🔷 FOOTER */}
              <div style={{ marginTop: "80px", fontSize: "12px", textAlign: "center" }}>
                <p>Thank you for staying with us!</p>
                <p>We look forward to serving you again.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GenerateBill;
