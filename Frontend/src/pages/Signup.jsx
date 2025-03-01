import { useForm } from "react-hook-form"; // Import Use Form
import googleIcon from "../assets/google-icon.png"; // Import Google icon png
import { Link } from "react-router-dom"; // Import Link for redirecte to pages
import { z } from "zod"; // Import zod for validate form inputs
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";



const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters").max(15, "Password shouldn't exceed 15 characters"),
  newsUpdates: z.boolean(),
});

const Signup = () => {

  const Navigate = useNavigate();
  // Form Handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      newsUpdates: false,
    },
  });

  // function for form 
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Send form data to backend
      });

      const result = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        Navigate("../add_info"); // Navigate to next page
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  // Creating form from here
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 border-gray-300 rounded-2xl w-6/6 mx-4 p-4 mt-10 flex flex-col gap-2 md:w-[40%] md:ml-[30%]"
      >
        <h1 className="font-bold text-2xl my-6 text-[#444444]">
          Create Your Account
        </h1>
        <button className="z-0 border-2 p-2 w-full border-gray-600 rounded font-medium relative text-sm active:bg-[#444444] active:text-white transition-all select-none">
          <div className="flex">
            <img src={googleIcon} className="w-[25px] h-[25px]" />
            <h1 className="w-11/12 text-center">Continue with Google</h1>
          </div>
        </button>
        <div className="flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Email address </p>
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email")}
            className="border-2 w-full p-2 rounded border-gray-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <p className="text-sm text-gray-500">Password</p>
          <input
            type="text"
            placeholder="Enter your password"
            {...register("password")}
            className="border-2 w-full p-2 rounded border-gray-300"
          />
          {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
        </div>
        <div className="flex items-center ">
          <input type="checkbox" {...register("newsUpdates")} />

          <p className="text-sm px-1">Receive news, updates and deals </p>
        </div>
        <button
          type="submit"
          className="p-2 w-full rounded font-medium bg-[#444444] text-white text-medium active:bg-[#616060]"
        >
          Create Account
        </button>
        <p className="text-xs text-gray-500">
          By Creating an account , you are agree to the
          <span className="underline"> Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy.</span>
        </p>
        <p className="text-xs text-gray-500 text-center">
          Already have an account? <Link to='/Login' className="underline">Log in here</Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
