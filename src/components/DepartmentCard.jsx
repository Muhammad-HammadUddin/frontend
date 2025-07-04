import React from 'react';

function DepartmentCard({ name, color, onClick }) {
  return (
    <div
      className={`${color} rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-white text-center">{name}</h2>
    </div>
  );
}

export default DepartmentCard;