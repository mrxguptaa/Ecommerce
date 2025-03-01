import Navbar from "./components/Navbar";
import Signup from "./pages/customer/Signup";
import NoPage from "./components/NoPage"
import Home from "./pages/customer/Home"
import Login from "./pages/customer/Login"
import Profile from './pages/customer/Profile'
import AddInfo from "./pages/customer/add.info";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Profile' element={<Profile/>} />
          <Route path="/add_info" element={<AddInfo/>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
