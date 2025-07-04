import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link component from react-router-dom
import DepartmentCard from '../components/DepartmentCard.jsx';
import VerificationForm from '../components/VerificationForm.jsx';

const departments = [
  { id: 1, name: 'Education', color: 'bg-blue-500' },
  { id: 2, name: 'Finance', color: 'bg-green-500' },
  { id: 3, name: 'Food', color: 'bg-yellow-500' },
];

function Department() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleCardClick = (id) => {
    setSelectedDepartment(id);
  };

  const handleCloseForm = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="min-h-screen bg-green-300 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">Department Access</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              name={dept.name}
              color={dept.color}
              onClick={() => handleCardClick(dept.id)}
            />
          ))}
        </div>
        
        {/* Display the Verification Form if a department is selected */}
        {selectedDepartment !== null && (
          <VerificationForm
            departmentName={departments.find((d) => d.id === selectedDepartment)?.name || ''}
            onClose={handleCloseForm}
          />
        )}

        {/* Link to go back to the home page with better styling */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Department;
