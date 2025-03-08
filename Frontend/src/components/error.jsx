import { X } from "lucide-react";
import Swal from 'sweetalert2'

const ErrorBox = ({ errorName }) => {
  return (
    <>
      {/* <div
        className={`fixed flex flex-col p-4 border-2 border-red-200 rounded-2xl gap-3 top-[30vh] w-[80%] left-[10%] bg-white transition-all duration-300 delay-200
        ${errorName ? "scale-110 opacity-100" : "scale-0 opacity-0"}`}
      >
        <h1 className="text-2xl text-red-700 font-bold font-mono ">Error</h1>
        <div className="flex justify-center">
          <X className="text-center bg-red-700 text-white rounded-[50%] text-2xl" />
        </div>
        <p>{errorName}</p>
      </div> */}
      {Swal.fire({
        title: "Error!",
        text: errorName,
        icon: "error",
        confirmButtonText: "Cool",
      })}
    </>
  );
};

export default ErrorBox;
