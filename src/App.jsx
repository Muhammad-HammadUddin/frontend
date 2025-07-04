import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BeneficiariesPage from "./routes/Benificiary.jsx";
import Home from "./routes/Home.jsx"
import Form from "./components/Form.jsx";
import Department from "./routes/Department.jsx";
import UserDetails from "./components/UserDetails.jsx";
import DepartmentDashboard from "./components/DepartmentDashBoard.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import DepartmentStaffLogin from "./components/DeaparmtmentLogin.jsx";
import { AdminDashboard } from "./components/AdminDashboard.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
       
        
        <Route path="/AdminLogin" element={<AdminLogin />}/>
        <Route path="/DepartmentLogin" element={<DepartmentStaffLogin />}/>
         
          
        
        <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/beneficiaries" element={<BeneficiariesPage />} />


        
       
        <Route path="/form" element={<Form />} />
        
        <Route path="/user-details" element={<UserDetails/>}/>
        <Route path="/department" element={ <Department/> } />
        <Route path="/Department-dashBoard/:id" element={ <DepartmentDashboard/> } />
      </Routes>
    </Router>
  );
}
