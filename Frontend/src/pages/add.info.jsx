import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddInfo = () => {
    const {register , handleSubmit} = useForm();
   
    const onSubmit = (data) => {
        console.log(data)
    }
    return(
        <>
        <form className="flex border-2 border-gray-400 w-[80%] ml-[10%] p-2 flex-col gap-2" onSubmit={handleSubmit(onSubmit)} >
        <h1>Update Your Profile</h1>
        <input type="text" name="" id="" placeholder="Full Name" className="border-2 p-2 " {...register("FullName")}/>
        <input type="text" placeholder="Username" className="border-2 p-2 " {...register("Username")}/>
        <input type="number" name="" id="" placeholder="Phone No." className="border-2 p-2 " {...register("Number")}/>
        <h1>Address</h1> 
        <select name="" id="" className="border-2 p-2 ">
            <option value="">Home</option>
            <option value="">Work</option>
            <option value="">Other</option>
        </select>
        <input type="text" placeholder="Street" className="border-2 p-2 " {...register("Street")}/>
        <input type="text" placeholder="Locality" className="border-2 p-2 " {...register("Locality")}/>
        <input type="text" placeholder="City" className="border-2 p-2 " {...register("City")}/>
        <input type="text" placeholder="State" className="border-2 p-2 " {...register("State")}/>
        <input type="text" placeholder="Country" className="border-2 p-2 " {...register("Country")}/>
        <input type="number" placeholder="Postal Code" className="border-2 p-2 " {...register("Number")}/>
        <input type="submit" value="Submit" className="border-2 p-2 "/>
        </form>
        </> 
    )
}

export default AddInfo