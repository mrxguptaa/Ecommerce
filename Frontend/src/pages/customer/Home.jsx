import Newsletter from "../../components/newsletter";
import { useEffect, useState } from "react";
const Home = () => {
  const [Loaded, Loading] = useState(false); // Loading text till component rendering
  return (
    <>
      {/* {userName ? <p className="text-center ">Hey {userName} </p> : ''} */}
      {Loaded ? (
        <>
          <h1 className="text-center items-center">This is Home Customers Page</h1>

          <Newsletter />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Home;
