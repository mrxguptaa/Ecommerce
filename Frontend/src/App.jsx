import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage"
import Home from "./pages/Home"
import Login from "./pages/Login"
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
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
