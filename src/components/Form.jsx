import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";

export default function Form() {
  const [formData, setFormData] = useState({
    Name: "",
    CNIC: "",
    phoneNumber: "",
    address: "",
    purpose: "",
    token: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.Name.trim() === "") {
      newErrors.Name = "Name is required";
      isValid = false;
    }

    if (!/^\d{13}$/.test(formData.CNIC)) {
      newErrors.CNIC = "CNIC must be 13 digits";
      isValid = false;
    }

    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits";
      isValid = false;
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (formData.purpose === "") {
      newErrors.purpose = "Purpose of visit is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) {
      return;
    }

    try {
      // Generate token
      const token = Math.floor(1000000000 + Math.random() * 9000000000);
      console.log("token");

      // Add token to formData
      const updatedFormData = {
        ...formData,
        token, // Add the token to the form data
      };

      // Send the form data to the backend
      const response = await axiosInstance.post("/api/user/form", updatedFormData);
      console.log("Form submitted successfully:", response.data);

      // Prepare the data to be saved in localStorage (including the token)
      console.log(token);
      const formattedData = {
        Name: formData.Name,
        CNIC: formData.CNIC,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        purpose: formData.purpose,
        token: response.data.userData.token, // Ensure token is a string for localStorage
      };

      // Save the formatted data to localStorage
      localStorage.setItem("formData", JSON.stringify(formattedData));
      navigate("/user-details"); // Navigate to user details page

      // Reset form data after successful submission
      setFormData({
        Name: "",
        CNIC: "",
        phoneNumber: "",
        address: "",
        purpose: "",
      });

      alert("Registration successful!");
    } catch (error) {
      console.error("Error submitting the form:", error.response?.data || error.message);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-green-500">Beneficiary Application</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please fill in the details below</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Full Name */}
            <div className="mb-2">
              <label htmlFor="Name" className="sr-only">Full Name</label>
              <input
                id="Name"
                name="Name"
                type="text"
                required
                
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm"
                placeholder="Full Name"
                value={formData.Name}
                onChange={handleChange}
              />
              {errors.Name && <p className="text-red-500 text-xs italic">{errors.Name}</p>}
            </div>

            {/* CNIC */}
            <div className="mb-4">
              <label htmlFor="CNIC" className="sr-only">CNIC</label>
              <input

                id="CNIC"
                name="CNIC"
                type="text"
                required
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm "
                placeholder="CNIC (13 digits)"
                value={formData.CNIC}
                onChange={handleChange}
              />
              {errors.CNIC && <p className="text-red-500 text-xs italic">{errors.CNIC}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm mb-2"
                placeholder="Phone Number (11 digits)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="sr-only">Address</label>
              <textarea
                id="address"
                name="address"
                required
                className="border-green-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm"
                placeholder="Address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
            </div>

            {/* Purpose of Visit */}
            <div className=" mt-">
              <label htmlFor="purpose" className="sr-only ">Purpose of Visit</label>
              <select
                id="purpose"
                name="purpose"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-300 sm:text-sm "
                onChange={handleChange}
              >
                <option disabled value="" selected>Select Purpose of Visit</option>
                <option value="Financial">Financial Aid</option>
                <option value="Education">Education Support</option>
                <option value="Food">Food Assistance</option>
              </select>
              {errors.purpose && <p className="text-red-500 text-xs italic">{errors.purpose}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-green-600 hover:text-green-700">
            Go back home
          </Link>
        </div>

        </form>
      </div>
    </div>
  );
}
