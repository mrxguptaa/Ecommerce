import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Logout = () => {
    const Navigate = useNavigate()

    useEffect(()=> {
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        Navigate('/');
    },[Navigate])
    return null
}

export default Logout