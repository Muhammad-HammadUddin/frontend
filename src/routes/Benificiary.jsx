import { Sidebar } from "../components/Sider.jsx";
import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";

import { axiosInstance } from "../api/axiosInstance.js";

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [editBeneficiary, setEditBeneficiary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState(null);

  // Fetch all beneficiaries initially
  const fetchBeneficiaries = () => {
    const endpoint = `/api/user`;
    axiosInstance.get(endpoint,{
      withCredentials: true, // This allows credentials (cookies) to be sent with the request

    })
      .then((response) => {
        setBeneficiaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching beneficiaries:", error);
      });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-CA');
  };

  const handleEditClick = (beneficiary) => {
    setEditBeneficiary(beneficiary);
    setIsModalOpen(true); // Open the modal to edit
  };

  const handleDeleteClick = (beneficiary) => {
    setBeneficiaryToDelete(beneficiary); // Store the beneficiary to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    if (beneficiaryToDelete) {
      axiosInstance.delete(`/api/user/${beneficiaryToDelete._id}`)
        .then(() => {
          fetchBeneficiaries(); // Re-fetch beneficiaries after deletion
          setIsDeleteModalOpen(false); // Close the delete confirmation modal
        })
        .catch((error) => {
          console.error("Error deleting beneficiary:", error);
        });
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
    setBeneficiaryToDelete(null); // Reset the beneficiary to delete
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditBeneficiary(null); // Reset the beneficiary
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBeneficiary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/api/user/${editBeneficiary._id}`, editBeneficiary,{
     
    })
      .then(() => {
        fetchBeneficiaries(); // Re-fetch beneficiaries after updating
        handleCloseModal(); // Close the edit modal
      })
      .catch((error) => {
        console.error("Error updating beneficiary:", error);
      });
  };

  useEffect(() => {
    fetchBeneficiaries(); // Fetch all beneficiaries initially
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto lg:ml-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Beneficiaries</h2>
            
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            {/* Removed Search Input and Button */}
          </div>

          {/* Table for beneficiaries */}
          <div className="bg-green-50 rounded-lg shadow overflow-auto lg:flex flex-col lg:flex-row">
          <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Application</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-right">Edit OR Delete</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((beneficiary, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{beneficiary.Name}</td>
                    <td className="px-4 py-2">{beneficiary.phoneNumber}</td>
                    <td className="px-4 py-2">{beneficiary.purpose}</td>
                    <td className="px-4 py-2">{formatDate(beneficiary.createdAt)}</td>
                    <td className="px-4 py-2">{beneficiary.status}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 bg-transparent text-gray-500 hover:bg-gray-100 rounded-lg"
                          onClick={() => handleEditClick(beneficiary)}
                        >
                          <MdEdit size={22} />
                        </button>
                        <button
                          className="p-2 bg-transparent text-red-500 hover:bg-red-100 rounded-lg"
                          onClick={() => handleDeleteClick(beneficiary)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Beneficiary</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="Name"
                  value={editBeneficiary.Name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editBeneficiary.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Application</label>
                <input
                  type="text"
                  name="purpose"
                  value={editBeneficiary.purpose || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={editBeneficiary.status || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
