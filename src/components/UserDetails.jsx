import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ReactPDF from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Link } from "react-router-dom";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f0f0f0",
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  qrCodeContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  qrCode: {
    marginTop: 20,
  },
});

const MyDocument = () => {
  // Retrieve the user data from localStorage
  const storedUser = localStorage.getItem("formData");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Text>No user data found</Text>;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text><strong>Name:</strong> {user.Name}</Text>
          <Text><strong>CNIC:</strong> {user.CNIC}</Text>
          <Text><strong>Phone Number:</strong> {user.phoneNumber}</Text>
          <Text><strong>Address:</strong> {user.address}</Text>
          <Text><strong>Token No:</strong> {user.token}</Text>
          <Text><strong>Purpose of Visit:</strong> {user.purpose}</Text>
        </View>

        <View style={styles.qrCodeContainer}>
          <Text>QR Code:</Text>
          <View style={styles.qrCode}>
            {/* Render the QR code inside the PDF */}
            <QRCode value={JSON.stringify(user)} size={150} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function UserDetails() {
  const [user, setUser] = useState(null); // To store user data

  useEffect(() => {
    // Get the data from localStorage
    const storedUser = localStorage.getItem("formData");

    // If the data exists in localStorage, parse it and set it to state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // If user data is not available, show a loading or error message
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mx-auto">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">User Details</h2>
          <p className="mt-2 text-center text-sm text-gray-600">No user data found. Please ensure that the form is submitted first.</p>
        </div>
      </div>
    );
  }

  // Function to generate and download the PDF
  const handleGeneratePDF = () => {
    // Generate the PDF blob
    ReactPDF.pdf(<MyDocument />).toBlob().then((blob) => {
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "user-details.pdf"; // File name for download
      link.click(); // Programmatically click the link to trigger the download
    });
  };

  return (
    <div className="h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white p-8 rounded-xl shadow-lg mx-auto">
        <h2 className="text-center text-3xl font-semibold text-green-600"><strong>User Details</strong></h2>
        <p className="mt-2 text-center text-sm text-gray-600">Here are the details of the registered user.</p>

        <div className="mt-6 space-y-4">
          {/* User details */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700"><strong>Name:</strong> {user.Name}</p>
            <p className="text-lg font-medium text-gray-700"><strong>CNIC:</strong> {user.CNIC}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Address:</strong> {user.address}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Token No:</strong> {user.token}</p>
            <p className="text-lg font-medium text-gray-700"><strong>Purpose of Visit:</strong> {user.purpose}</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md mt-6">
            <QRCode value={JSON.stringify(user)} size={150} />
          </div>

          {/* Button to generate and download the PDF */}
          <div className="mt-6">
            <button
              onClick={handleGeneratePDF}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Download PDF
            </button>
          </div>


          <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-green-600 hover:text-green-700">
            Go back home
          </Link>
        </div>



          
        </div>
      </div>
    </div>
  );
}
