import { useEffect, useState } from "react";
import SuccessMsg from "../../components/successMsg";

const AdminProfile = () => {
  const [loaded, loading] = useState(false);
  const [ProfileInfo, setData] = useState(null);
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/api/org/getOrg/null",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        // console.log(data);
        loading(true);
        setData(data.org);
        if (!response.ok) {
            console.log('Something Went wrong')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminProfile();
  }, []);
//   setTimeout(() => {
//     document.getElementById("success").style.transform = "scale(0)";
//     // document.getElementById('success').style.display='none';
//   }, 1500);
  return (
    <>
      {loaded ? (
          <>
          {console.log(ProfileInfo)}
          <div className="w-[90%] ml-[5%] mt-5">
          <h1 className="text-4xl font-bold ">Organization Info</h1>
          <ul className="my-5 flex flex-col gap-2 bg-sky-100 p-4 rounded-2xl">
            <li className="font-medium">{ProfileInfo.name}</li>
            <li><img src={ProfileInfo.companyLogo} alt={ProfileInfo.companyLogo} /></li>
            <li className="font-medium text-gray-500 flex items-center">User Type - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl float-right">{ProfileInfo.userType}</div>
            <li className="font-medium text-gray-500 flex items-center">Gst - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.gstin}</div>
            <h4 className="font-bold text-gray-500 flex items-center">Address - </h4>
            <li className="font-medium text-gray-500 flex items-center">Address Line 1 - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.address1}</div>
            <li className="font-medium text-gray-500 flex items-center">Address Line 2 - </li><div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.address2}</div>
            <li className="font-medium text-gray-500 flex items-center">Address Line 3 - </li><div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.address3}</div>
            <li className="font-medium text-gray-500 flex items-center">District - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.dst}</div>
            <li className="font-medium text-gray-500 flex items-center">State - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.st}</div>
            <li className="font-medium text-gray-500 flex items-center">Pin code - </li><div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.pncd}</div>
            <li className="font-medium text-gray-500 flex items-center">Country - </li> <div className="text-black border-2 p-2 px-4 bg-white rounded-xl">{ProfileInfo.principalPlaceOfAddress.addr.country}</div>

          </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminProfile;
