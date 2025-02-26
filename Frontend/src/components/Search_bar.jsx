import {Search} from "lucide-react"

const Searchbar = () => {
  return (
    <>
    <div className="basis-4/12 border-2 border-gray-400 rounded-2xl p-1 hidden md:flex justify-between">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search here..."
        className="w-11/12 p-1 px-4 -2xl capitalize focus:outline-none active:outline-none"
        />
      <div className="flex justify-center items-center flex-grow">
        <Search className="active:text-gray-400 "/>
      </div>
    </div>
        </>
  );
};

export default Searchbar;
