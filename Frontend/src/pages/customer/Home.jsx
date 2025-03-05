import Products from "../../components/products";
import ErrorBox from "../../components/error";
import Newsletter from "../../components/newsletter";
import { useEffect, useState } from "react";
const Home = () => {
  const [errors, setError] = useState(); // Storing error to Show error to user
  // const userName = localStorage.getItem("userEmail");
  const [products, setProducts] = useState(null); // Storing products
  const [Loaded, Loading] = useState(false); // Loading text till component rendering
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product");
        const data = await response.json();
        // console.log(`This is Response`, data);
        setProducts(data);
        Loading(true);
      } catch (error) {
        setError("Something went wrong \nUnable to Fetch the Products");
        Loading(true);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      {/* {userName ? <p className="text-center ">Hey {userName} </p> : ''} */}
      {Loaded ? (
        <>
          <h1 className="text-center items-center">This is Home Page</h1>
          <Products products={products} />
          <div className="flex justify-between p-2 flex-wrap">
          {products.map((product)=> {
            console.log(product)
            return(
              <>
              <div className="basis-[45%] m-2">
                <div className="w-full h-[15vh] border"><img src={product.images[0]} alt="" /></div>
                <h1 className="capitalize font-bold">{product.print_name}</h1>
                <p className="text-sm">{product.price}rs</p>
                </div>
              
              </>
            )
          })}
          </div>
          <Newsletter/>
          {errors ? <ErrorBox errorName={errors} /> : ""}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Home;
