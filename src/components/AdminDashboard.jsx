import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sider.jsx";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { axiosInstance } from "../api/axiosInstance.js";
// Pie Chart for Purpose and Status

export function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [purposeData, setPurposeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [userTypeData, setUserTypeData] = useState([]); // For new vs returning users

  // Define colors for Purpose, Status, and User Type
  const purposeColors = {
    Financial: "#4CAF50", // Green
    Food: "#2196F3", // Blue
    Education: "#FF5722", // Red
  };

  const statusColors = {
    Completed: "#4CAF50", // Green
    Pending: "#F44336", // Red
  };

  const userTypeColors = {
    New: "#FFEB3B", // Yellow
    Returning: "#2196F3", // Blue
  };

  // Fetch user details from API
  const FetchDetails = async () => {
    console.log("Fetching Details");
    try {
      const response = await axiosInstance.get("/api/user", { // Use axiosInstance instead of axios
        withCredentials: true, // Include credentials (cookies, etc.)
      });
      const data = response.data;
      setUserData(data);
  
      // Processing purpose data for Pie chart
      const purposeCounts = data.reduce((acc, user) => {
        acc[user.purpose] = (acc[user.purpose] || 0) + 1;
        return acc;
      }, {});
  
      // Format the purpose data and assign colors
      const formattedPurposeData = Object.keys(purposeCounts).map((purpose) => ({
        label: purpose,
        value: purposeCounts[purpose],
        color: purposeColors[purpose] || "#9E9E9E", // Assign color or default to grey
      }));
      setPurposeData(formattedPurposeData);
  
      // Processing status data for Pie Chart
      const statusCounts = data.reduce((acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
      }, {});
  
      // Format the status data and assign colors
      const formattedStatusData = Object.keys(statusCounts).map((status) => ({
        label: status,
        value: statusCounts[status],
        color: statusColors[status] || "#9E9E9E", // Assign color or default to grey
      }));
      setStatusData(formattedStatusData);
  
      // Processing user type data (New vs Returning)
      const userTypeCounts = data.reduce(
        (acc, user) => {
          if (user.visitCount === 1) {
            acc.New += 1;
          } else {
            acc.Returning += 1;
          }
          return acc;
        },
        { New: 0, Returning: 0 }
      );
  
      // Format the user type data and assign colors
      const formattedUserTypeData = [
        {
          label: "New Users",
          value: userTypeCounts.New,
          color: userTypeColors.New,
        },
        {
          label: "Returning Users",
          value: userTypeCounts.Returning,
          color: userTypeColors.Returning,
        },
      ];
      setUserTypeData(formattedUserTypeData);
  
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  

  useEffect(() => {
    FetchDetails();
  }, []);

  // Calculate totals for displaying general statistics
  const totalUsers = userData.length;

  return (
    <div className="h-screen bg-gray-50">
      <div className="grid lg:grid-cols-[240px_1fr] h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="p-8 h-full overflow-y-auto">
          <div className="space-y-12">
            
            {/* Page Heading */}
            <header className="mb-8">
              <h1 className="text-5xl font-bold text-green-500 text-center">Dashboard</h1>
              <p className="text-lg text-gray-600 font-semibold text-center">Analytics</p>
            </header>

            {/* Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {/* Total Users Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">Total Applicants</h3>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </section>

            {/* New vs Returning Users Pie Chart */}
            <div className="w-full bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">New vs Returning Users</h2>
              <div className="flex flex-col lg:flex-row justify-between">
                {/* Pie Chart */}
                <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                  {userTypeData.length > 0 ? (
                    <PieChart
                      series={[{
                        data: userTypeData,
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 10,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 150,
                        cy: 150,
                      }]}

                      width="100%"
                      height={350}
                    />
                  ) : (
                    <div className="text-center text-gray-500">No data available</div>
                  )}
                </div>

                {/* Color Legend */}
                <div className="w-full lg:w-1/3 pl-0 lg:pl-6">
                  {userTypeData.length > 0 ? userTypeData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div
                        className="w-6 h-6 mr-4"
                        style={{ backgroundColor: item.color }} // Use color defined above
                      ></div>
                      <span className="text-lg">{item.label}: {item.value}</span>
                    </div>
                  )) : (
                    <div>No data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Purpose Breakdown Pie Chart */}
            <div className="w-full bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Purpose Breakdown</h2>
              <div className="flex flex-col lg:flex-row justify-between">
                {/* Pie Chart */}
                <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                  {purposeData.length > 0 ? (
                    <PieChart
                      series={[{
                        data: purposeData,
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 10,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 150,
                        cy: 150,
                      }]}

                      width="100%"
                      height={350}
                    />
                  ) : (
                    <div className="text-center text-gray-500">No data available</div>
                  )}
                </div>

                {/* Color Legend */}
                <div className="w-full lg:w-1/3 pl-0 lg:pl-6">
                  {purposeData.length > 0 ? purposeData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div
                        className="w-6 h-6 mr-4"
                        style={{ backgroundColor: item.color }} // Use color defined above
                      ></div>
                      <span className="text-lg">{item.label}: {item.value}</span>
                    </div>
                  )) : (
                    <div>No data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Breakdown Pie Chart */}
            <div className="w-full bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Status Breakdown</h2>
              <div className="flex flex-col lg:flex-row justify-between">
                {/* Pie Chart */}
                <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                  {statusData.length > 0 ? (
                    <PieChart
                      series={[{
                        data: statusData,
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 10,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 150,
                        cy: 150,
                      }]}

                      width="100%"
                      height={350}
                    />
                  ) : (
                    <div className="text-center text-gray-500">No data available</div>
                  )}
                </div>

                {/* Color Legend */}
                <div className="w-full lg:w-1/3 pl-0 lg:pl-6">
                  {statusData.length > 0 ? statusData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div
                        className="w-6 h-6 mr-4"
                        style={{ backgroundColor: item.color }} // Use color defined above
                      ></div>
                      <span className="text-lg">{item.label}: {item.value}</span>
                    </div>
                  )) : (
                    <div>No data available</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
