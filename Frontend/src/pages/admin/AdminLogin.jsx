import { useForm } from "react-hook-form";
import googleIcon from "../../assets/google-icon.png";
import { Link } from "react-router-dom";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../utilityFunciton/HelpContex'

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const [toggle, setToggle] = useState(false);
  const Navigate = useNavigate();
  const currUserData = useContext(UserContext);
  console.log("curr", currUserData);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5005/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Logged In");
        console.log(data);
        Navigate("/admin/ProductFetch"); // Navigate to next page
        localStorage.setItem("userEmail", result);
        currUserData.setUser(data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const RememberMe = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-gray-300 rounded-2xl w-6/6 mx-4 p-4 mt-10 flex flex-col gap-2 md:w-[40%] md:ml-[30%] select-none"
      >
        <h1 className="font-bold text-2xl mt-6 text-[#444444]">
          {" "}
          Admin Sign In
        </h1>
        <p className="my-2 text-xs text-gray-500">
          Log in by entering your email address and password.
        </p>

        <div>
          <p className="text-sm text-gray-500">Email address</p>
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email")}
            className="border-2 w-full p-2 rounded border-gray-300"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">Password</p>
          <input
            type="text"
            placeholder="Enter your password"
            {...register("password")}
            className="border-2 w-full p-2 rounded border-gray-300"
          />
        </div>
        <Link to="/forgotPassword" className="text-xs underline">
          Forgot Password?
        </Link>
        <button
          type="submit"
          className="p-2 w-full rounded font-medium bg-[#444444] text-white text-medium active:bg-[#616060]"
        >
          Log In
        </button>

        <div className="flex items-center gap-1" onClick={RememberMe}>
          {toggle ? (
            <ToggleRight className="text-blue-500" />
          ) : (
            <ToggleLeft className="text-red-500" />
          )}
          Remember Me?
        </div>

        {/* <div className="flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        {/* <button className="z-0 border-2 p-2 w-full border-gray-600 rounded font-medium relative text-sm active:bg-[#444444] active:text-white transition-all select-none">
                <div className="flex">
                  <img src={googleIcon} className="w-[25px] h-[25px]" />
                  <h1 className="w-11/12 text-center">Continue with Google</h1>
                </div>
                </button> */}
        {/* <p className="text-xs text-gray-500 text-center">
          Don't have an account? <Link to='/Signup' className="underline" >Sign up here</Link>
        </p> */}
      </form>
    </>
  );
};

export default AdminLogin;
