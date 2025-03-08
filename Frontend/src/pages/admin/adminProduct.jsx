import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loaded, isLoading] = useState(false);
  const [totalProducts , setTotalProducts] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/getItems`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProducts(data);
        setTotalProducts(data.response.length)
        isLoading(true);
        if (!response.ok) {
          setError("You are Unauthorized");
          return;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Something went wrong \nUnable to Fetch the Products",
          timer: 1500,
        });
      }
    };

    fetchProducts();
  }, []);



  return (
    <>
      <div className="ml-[5%] mt-10 w-[90%] flex flex-wrap justify-between">
        {loaded
          ? products.response.map((product) => {
              return (
                <>
                  <div className="border m-2 basis-[30%] rounded-2xl overflow-hidden bg-sky-100">
                    {/* Load Image if product have */}
                    <img className="w-full h-[25vh]" src={product.images[0]} alt={product.images[0]} />
                    <div className="p-2">
                      <p className="text-center font-bold text-lg">{product.printName}</p>
                      <p className="text-center">{product.description}</p>
                      {/* <p>{JSON.stringify(product.price)}</p> */}
                      <p>Price : {product.price?.$numberDecimal}</p>
                      <p>Stock : {product.currentStockQuantity}</p>
                    </div>
                  </div>
                </>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default Products;
