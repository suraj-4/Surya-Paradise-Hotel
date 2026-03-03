import React from 'react'
import { Card } from "antd";
import { TrendingUp, Users, BedDouble, ArrowUp } from "lucide-react";

function HotelStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Revenue */}
            <Card className="shadow-md">
            <p className="text-gray-500 text-[16px]">Total Revenue</p>
            <h2 className="text-[26px] font-bold text-gray-900">
                ₹3,13,021
            </h2>
            <p className="text-green-400 text-[14px] mt-2 flex items-center gap-1">
                <TrendingUp size={16} /> 8% vs last month
            </p>
            </Card>

            {/* Total Bookings */}
            <Card className="shadow-md">
            <p className="text-gray-500 text-[16px]">Total Bookings</p>
            <h2 className="text-[26px] font-bold text-gray-900 mt-2 flex items-center gap-2">
                1,248
            </h2>
            <p className="text-green-400 text-[14px] mt-2 flex items-center gap-1">
                <BedDouble size={16} /> 12% vs last month
            </p>
            </Card>

            {/* Occupancy Rate */}
            <Card className="shadow-md">
            <div>
                <p className="text-gray-500 text-[16px]">Occupancy Rate</p>
                <h2 className="text-[26px] font-bold text-gray-900 mt-2">71%</h2>
                <p className="text-green-400 text-[14px] mt-2 flex items-center gap-1">
                <ArrowUp size={16} /> Goal: 85%
                Goal: 85%
                </p>
            </div>
            </Card>

            {/* New Guests */}
            <Card className="shadow-md">
            <p className="text-gray-500 text-[16px]">New Guests</p>
            <h2 className="text-[26px] font-bold text-gray-900 mt-2">
                324
            </h2>
            <p className="text-green-400 text-[14px] mt-2 flex items-center gap-1">
                <Users size={16} /> 15% vs last week
            </p>
            </Card>

        </div>
  )
}

export default HotelStats;
