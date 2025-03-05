import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Logout = () => {
    const Navigate = useNavigate()

    useEffect(()=> {
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        Navigate('/');
        window.location.reload()
    },[Navigate])
    return null
}

export default Logout