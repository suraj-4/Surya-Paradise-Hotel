import { useState, useEffect } from "react";
import { Form } from "antd";
import dayjs from "dayjs";

function BillingForm() {
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

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      
      {/* 🔷 Guest Info */}
      <h3 className="mb-3 font-semibold">Guest Info</h3>

      <div className="mb-4">
        <CustomLabel>Name</CustomLabel>
        <CustomInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Guest Name"
        />
      </div>

      <div className="mb-4">
        <CustomLabel>Phone</CustomLabel>
        <CustomInput
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </div>

      <div className="mb-4">
        <CustomLabel>GSTIN (Optional)</CustomLabel>
        <CustomInput
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          placeholder="GSTIN"
        />
      </div>

      {/* 🔷 Booking Details */}
      <h3 className="mb-3 font-semibold">Booking Details</h3>

      <div className="mb-4">
        <CustomLabel>Room No</CustomLabel>
        <CustomInput
          name="roomNo"
          value={formData.roomNo}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-full">
          <CustomLabel>Check-in</CustomLabel>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="w-full">
          <CustomLabel>Check-out</CustomLabel>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <CustomLabel>Nights</CustomLabel>
        <CustomInput value={formData.nights} disabled />
      </div>

      {/* 🔷 Charges */}
      <h3 className="mb-3 font-semibold">Charges</h3>

      <div className="mb-4">
        <CustomLabel>Room Charge</CustomLabel>
        <CustomInput
          type="number"
          name="roomCharge"
          value={formData.roomCharge}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <CustomLabel>Extra Charges</CustomLabel>
        <CustomInput
          type="number"
          name="extras"
          value={formData.extras}
          onChange={handleChange}
          placeholder="Food, Laundry"
        />
      </div>

      <div className="mb-4">
        <CustomLabel>Discount</CustomLabel>
        <CustomInput
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>

      {/* 🔷 GST Summary */}
      <h3 className="mb-3 font-semibold">GST Summary</h3>

      <div className="mb-2">
        <p>GST %: <strong>{formData.gstRate}%</strong></p>
        <p>GST Amount: ₹{formData.gstAmount}</p>
        <p className="text-lg font-bold">Total: ₹{formData.total}</p>
      </div>

      {/* 🔷 Actions */}
      <div className="flex gap-3 mt-5">
        <FillableBtn htmlType="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Invoice"}
        </FillableBtn>

        <FillableBtn
          type="button"
          onClick={() => console.log("Generate PDF")}
        >
          Generate PDF
        </FillableBtn>

        <FillableBtn
          type="button"
          onClick={() => console.log("Mark as Paid")}
        >
          Mark as Paid
        </FillableBtn>
      </div>
    </Form>
  );
}

export default BillingForm;