import Navbar from "./components/Navbar";
import Signup from "./pages/customer/Signup";
import NoPage from "./components/NoPage"
import Home from "./pages/customer/Home"
import Login from "./pages/customer/Login"
import Profile from './pages/customer/Profile'
import AddInfo from "./pages/customer/add.info";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminNavbar from './pages/admin/AdminNavbar'
import ProductFetch from './pages/admin/ProductFetch'
import AdminProfile from './pages/admin/AdminProfile'
import Logout from './pages/customer/logout'
import { UserConProv } from "./utilityFunciton/HelpContex";
import { useState } from "react";
import Test from './pages/admin/test'
import { lazy } from 'react';

const App = () => {
  const [user,setUser]=useState(localStorage.getItem("userEmail"))
  return (
    <UserConProv value={{user,setUser}}>
      <Router>
      {location.pathname.startsWith("/customer") ? <Navbar /> : <AdminNavbar />}
          {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<AdminLogin/>}/>
          <Route path="/productsfetch" element={<ProductFetch/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
          <Route path="/test" element={<Test />} />
          <Route path="/AdminProfile" element={<AdminProfile/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Profile' element={<Profile/>} />
          <Route path="/add_info" element={<AddInfo/>} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/customer" element={<Home/>}/>

        </Routes>
      </Router>
      </UserConProv>
  );
}

export default App;
