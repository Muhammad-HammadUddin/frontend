import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom"; // Import Link for routing
import { axiosInstance } from "../api/axiosInstance";

const DepartmentDashboard = () => {
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const departmentName = location.pathname.split("/")[2];

  useEffect(() => {
    const savedToken = JSON.parse(localStorage.getItem("TokenSaver") || "{}");

    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/Staff/verifyUser",
          {
            token: savedToken.token,
            purpose: departmentName,
          },
          {
            withCredentials: true,
          }
        );

        const userId = response.data.user._id;

        if (userId) {
          const userDetailsResponse = await axiosInstance.get(
            `/api/user/${userId}`
          );
          setUserData(userDetailsResponse.data.user);
          setStatus(userDetailsResponse.data.user.status || "Pending");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("User not found or invalid token.");
        } else {
          setError("Error fetching user data.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [departmentName]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (status !== "Pending" && status !== "Completed") {
      setError('Status must be either "Pending" or "Completed".');
      return;
    }

    axiosInstance.put(
        `/api/user/update/${userData._id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserData(response.data.user);
        setError("");
        alert("User status updated successfully!");
      })
      .catch((error) => {
        setError("Error updating user status.");
        console.error(error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="w-8 h-8 animate-spin border-t-4 border-green-600 border-solid rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20M4 12h16"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Please try again later or check the department name.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-6">User Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Name" value={userData.Name} />
          <InfoItem label="CNIC" value={userData.CNIC} />
          <InfoItem label="Phone Number" value={userData.phoneNumber} />
          <InfoItem label="Address" value={userData.address} />
          <InfoItem label="Token No" value={userData.token} />
          <InfoItem label="Purpose of Visit" value={userData.purpose} />
        </div>

        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={handleUpdateStatus}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Update Status
          </button>
        </div>

        {/* Links to navigate back */}
        <div className="mt-6 space-x-4 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go back to Main Page
          </Link>
          <Link
            to={`/department`}
            className="inline-block px-6 py-2 text-lg font-medium text-white bg-gray-600 rounded-md shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go back to Department
          </Link>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);

export default DepartmentDashboard;
