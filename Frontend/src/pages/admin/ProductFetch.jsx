import ErrorBox from "../../components/error";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ProductFetch = ( initialProducts ) => {
  const [errors, setError] = useState(); // Storing error to Show error to user
  // const userName = localStorage.getItem("userEmail");
  const [products, setProducts] = useState(null); // Storing products
  const [Loaded, Loading] = useState(false); // Loading text till component rendering
  const [totalProducts, setTotalProducts] = useState(0); // Total Products fetched
  const {register , handleSubmit} = useForm();

  useEffect(() => {



    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/api/item/get-all-item",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(`This is Response`, data.response);
        setProducts(data.response);
        setTotalProducts(data.response.length);
        Loading(true);
        if (!response.ok) {
          setError("You are Unauthorized");
        }
      } catch (error) {
        setError("Something went wrong \nUnable to Fetch the Products");
        Loading(true);
        console.log(error);
      }
    };
    fetchProducts();
  }, [initialProducts]);

  return (
    <>
      {Loaded ? (
        errors ? (
          <ErrorBox errorName={errors} />
        ) : (
          <ul className="flex p-2 flex-col w-[80%] mx-[10%]">
            <h1 className="text-center text-2xl font-bold border-b-2 p-2 mb-4">
              Fetched Products from Finance Module
              <p className="text-sm"> Total Product Found = {totalProducts}</p>
            </h1>
            {products.map((product, index) => {
              // console.log(totalProducts, product);
              return (
                <>
                  <li className="m-2 border-2 p-2 rounded-xl">
                    {index + 1}
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6"> Name : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.name} disabled
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Print Name : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.printName}
                      />
                      {/* <input
                        className="capitalize text-gray-700 border-2 px-4 mx-3 py-1 rounded-xl "
                        placeholder="Enter Print Name"
                      /> */}
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Description : </p>
                      <textarea cols={22} rows={1}
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        placeholder="Set Description"
                      
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Price : </p>
                      <input type="number" pattern="^\d*(\.\d{0,2})?$"
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        placeholder="Set Price"
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">In Stock : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.currentStockQuantity}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Product Category : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.productCategory}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Unit : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.unit}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Specs : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.specification}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Active : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.specification}
                      />
                    </div>
                    <input type="submit" value="Update" className="border-2 px-10 py-2 m-2 relative float-right bg-green-400 rounded-xl font-bold "/>
                  </li>
                </>
              );
            })}
          </ul>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default ProductFetch;
