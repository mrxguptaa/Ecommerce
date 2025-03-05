import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Cookies from 'js-cookie'; 

const Logout = () => {
    const Navigate = useNavigate()

    useEffect(()=> {
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        Navigate('/');
        // Cookies.remove('token', {path: '/login'});
        window.location.reload()
    },[Navigate])
    return null
}

export default Logout