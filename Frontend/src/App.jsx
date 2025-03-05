import Navbar from "./components/Navbar";
import Signup from "./pages/customer/Signup";
import NoPage from "./components/NoPage"
import Home from "./pages/customer/Home"
import Login from "./pages/customer/Login"
import Profile from './pages/customer/Profile'
import AddInfo from "./pages/customer/add.info";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminDashboard from './pages/admin/AdminDashboard'
import Logout from './pages/customer/logout'
import { UserConProv } from "./utilityFunciton/HelpContex";
import { useState } from "react";
import { lazy } from 'react';



function App() {
  const [user,setUser]=useState(localStorage.getItem("userEmail"))
  return (
    <UserConProv value={{user,setUser}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Profile' element={<Profile/>} />
          <Route path="/add_info" element={<AddInfo/>} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
      </Router>
      </UserConProv>
  );
}

export default App;
