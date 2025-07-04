import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function VerificationForm({ departmentName, onClose }) {
  const [token, setToken] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token || !departmentName) {
      setResponseMessage("Token and Department are required");
      return;
    }
    const TokenSaver = {
      token: token, 
    };
    
   
    localStorage.setItem('TokenSaver', JSON.stringify(TokenSaver));
    navigate(`/Department-dashBoard/${departmentName}`);


    setResponseMessage(`Successfully navigating to ${departmentName} Dashboard!`);
    
    onClose(); // Close the form or popup
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Verify Access to {departmentName}</h2>
        
        {/* Display response message */}
        {responseMessage && <p className="text-green-500 mb-4">{responseMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="token" className="block text-gray-700 text-sm font-bold mb-2">
              Enter Verification Token
            </label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter token"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationForm;
