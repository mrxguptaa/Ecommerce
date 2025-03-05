import { useEffect, useState } from "react";

const ProfileInfo = () => {
  const [userProfile, setUserInfo] = useState(null);
  const [loaded, loading] = useState(false);
  useEffect(() => {
    const fetchProfileinfo = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        console.log("Finding Profile for", email);
        const response = await fetch(
          "http://localhost:5000/api/users/userInfo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        const userInfo = await response.json();
        console.log(userInfo)
        setUserInfo(userInfo);
        loading(true);
      } catch (error) {
        alert("Unable to fetch data");
        console.log("Error is ", error);
      }
    };
    fetchProfileinfo();
  }, []);
  return (
    <>
      {loaded ? (
        <div className="flex flex-col border-2 w-[90%] m-[5%] p-4 border-black rounded-3xl gap-2">
          <h1 className="font-bold">My Account</h1>
          <div className="flex justify-center items-center">
            <img
              className="w-[60px] h-[60px]  border rounded-[50%] "
              src="al"
            />
          </div>
          <p className="text-sm pl-1 font-medium">Full Name</p>
          <div className="border-2 p-2 rounded-xl bg-gray-100">
            {userProfile.fullName}
          </div>
          <p className="text-sm pl-1 font-medium">Email</p>
          <div className="border-2 p-2 rounded-xl bg-gray-100">
            {userProfile.email}
          </div>
          <p className="text-sm pl-1 font-medium">Phone</p>
          <div className="border-2 p-2 rounded-xl bg-gray-100">
            {userProfile.phoneNumber}
          </div>
          <p className="text-sm pl-1 font-medium">Address</p>
          <div className="border-2 p-2 rounded-xl bg-gray-100 flex flex-col">
            {userProfile.address.addressType} <br />
            {userProfile.address.street} {' '}
            {userProfile.address.locality} {' '}
            {userProfile.address.city} <br />
            {userProfile.address.state} <br />
            {userProfile.address.country} <br />
            {userProfile.address.postalCode}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default ProfileInfo;
