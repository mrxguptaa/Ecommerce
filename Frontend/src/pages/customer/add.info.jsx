import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import Popup from './popup';
import { useState, useEffect } from 'react';

const userSchema = z.object({
    FullName: z.string().min(3, "Full name must be at least 3 characters."),
    Username: z.string().min(4, "Username must be 4 digits").max(15, "Username shouldn't have more than 16 letters"),
    Number: z.string().transform((v) => Number(v) || 0).transform((v) => `+91${v}`),
    Street: z.string(),
    Locality: z.string().min(3, 'Enter Valid Locality'),
    City: z.string().min(3, 'Enter Valid City'),
    State: z.string().min(3, 'Enter Valid State'),
    Country: z.string().min(3, 'Enter Valid Country'),
    Postal: z.string().transform((v) => Number(v) || 0),
    AddressType: z.enum(["Home", "Work", "Other"], { message: "Select a valid address Type" }),
});

const AddInfo = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) }); // for form
    const [popUpData, setPopUpData] = useState(null); // to push props to pop up
    const [showPopUp, setShowPopUp] = useState(false); // to show the pop up 

    const onSubmit = (data) => {
        setPopUpData(data);
        setShowPopUp(true);
    };

    useEffect(() => {
        if (showPopUp) {
            console.log('Updated showPopUp:', showPopUp);
            console.log('Updated popUpData:', popUpData);
        }
    }, [showPopUp, popUpData]); 

    return (
        <>
            {showPopUp && <Popup data={popUpData} onClose={() => setShowPopUp(false)} />}  
            
            <form 
                className="border-2 border-gray-300 rounded-2xl w-6/6 mx-4 p-4 mt-10 flex flex-col gap-2 md:w-[40%] md:ml-[30%]" 
                onSubmit={handleSubmit(onSubmit)} 
            >
                <h1>Update Your Profile</h1>
                <input type="text" placeholder="Full Name" className="border-2 p-2 capitalize" {...register("FullName")} />
                {errors.FullName && <p className="text-red-500 text-sm">{errors.FullName.message}</p>}
                <input type="text" placeholder="Username" className="border-2 p-2 capitalize" {...register("Username")} />
                {errors.Username && <p className="text-red-500 text-sm">{errors.Username.message}</p>}
                <input type="number" placeholder="Phone No." className="border-2 p-2 capitalize" {...register("Number")} />
                {errors.Number && <p className="text-red-500 text-sm">{errors.Number.message}</p>}
                <h1>Address</h1>
                <select className="border-2 p-2 capitalize" {...register('AddressType')}>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" placeholder="Street" className="border-2 p-2 capitalize" {...register("Street")} />
                {errors.Street && <p className="text-red-500 text-sm">{errors.Street.message}</p>}
                <input type="text" placeholder="Locality" className="border-2 p-2 capitalize" {...register("Locality")} />
                {errors.Locality && <p className="text-red-500 text-sm">{errors.Locality.message}</p>}
                <input type="text" placeholder="City" className="border-2 p-2 capitalize" {...register("City")} />
                {errors.City && <p className="text-red-500 text-sm">{errors.City.message}</p>}
                <input type="text" placeholder="State" className="border-2 p-2 capitalize" {...register("State")} />
                {errors.State && <p className="text-red-500 text-sm">{errors.State.message}</p>}
                <input type="text" placeholder="Country" className="border-2 p-2 capitalize" {...register("Country")} />
                {errors.Country && <p className="text-red-500 text-sm">{errors.Country.message}</p>}
                <input type="number" placeholder="Postal Code" className="border-2 p-2 capitalize" {...register("Postal")} />
                {errors.Postal && <p className="text-red-500 text-sm">{errors.Postal.message}</p>}
                <input type="submit" value="Submit" className="border-2 p-2 capitalize" />
                <Link to='/' className='underline'>Skip for Now</Link>
            </form>
        </>
    );
};

export default AddInfo;
