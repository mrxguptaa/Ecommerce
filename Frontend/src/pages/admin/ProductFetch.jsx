import ErrorBox from "../../components/error";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ProductFetch = (initialProducts) => {
  const [errors, setError] = useState(); // Storing error to Show error to user
  // const userName = localStorage.getItem("userEmail");
  const [products, setProducts] = useState(null); // Storing products
  const [Loaded, Loading] = useState(false); // Loading text till component rendering
  const [totalProducts, setTotalProducts] = useState(0); // Total Products fetched
  const [fields, setFields] = useState([{ key: "", value: "" }]);
  const { register, handleSubmit } = useForm();

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

  const handleSpecsChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };
  
  const createSpecs = () => {
    setFields([...fields, { key: "", value: "" }]);
    console.log(fields)
  };
  return (
    <>
      {Loaded ? (
        errors ? (
          <ErrorBox errorName={errors} />
        ) : (
          <ul className="flex p-2 flex-col w-[80%] mx-[10%]">
            <h1 className="text-center text-2xl font-bold border-b-2 p-2 mb-4">
              Fetched Products from Finance Module
              <p className="text-sm"> Total Product Found = <span className="text-red-500">{totalProducts}</span></p>
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
                        value={product.name}
                        disabled
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Print Name : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.printName}
                        disabled
                      />
                      {/* <input
                        className="capitalize text-gray-700 border-2 px-4 mx-3 py-1 rounded-xl "
                        placeholder="Enter Print Name"
                      /> */}
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Description : </p>
                      <textarea
                        cols={22}
                        rows={1}
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        placeholder="Set Description"
                        {...register("desc")}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Price : </p>
                      <input
                        type="number"
                        pattern="^\d*(\.\d{0,2})?$"
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        placeholder="Set Price"
                        {...register("price")}
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">In Stock : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.currentStockQuantity}
                        disabled
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Product Category : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.productCategory}
                        disabled
                      />
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Unit : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.unit}
                      />
                    </div>
                    {/* ADD SPECIFICATION  */}
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Specs : </p>
                      <div>
                        {fields.map((field, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={field.key}
                              onChange={(e) =>
                                handleSpecsChange(index, "key", e.target.value)
                              }
                              placeholder="Enter Key"
                              className="border px-2 py-1 rounded-md w-1/2"
                            />
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleSpecsChange(index, "value", e.target.value)
                              }
                              placeholder="Enter Value"
                              className="border px-2 py-1 rounded-md w-1/2"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="px-2 py-1 mx-2 hover:bg-sky-200 transition-all text-center rounded-[50%] bg-sky-100 "
                        onClick={() => createSpecs()}
                      >
                        +
                      </button>
                    </div>
                    <div className="my-2 items-center capitalize font-bold text-black flex ">
                      <p className="w-1/6">Active : </p>
                      <input
                        className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl "
                        value={product.isActive ? "Yes" : "No"}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Update"
                      className="border-2 px-10 py-2 m-2 relative float-right bg-green-400 rounded-xl font-bold "
                    />
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
