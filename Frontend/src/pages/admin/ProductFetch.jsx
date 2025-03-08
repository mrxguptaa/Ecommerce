import ErrorBox from "../../components/error";
import { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_BASE_URL;
// console.log("Base URL:", baseUrl);

const ProductFetch = (initialProducts) => {
  const navigate = useNavigate(); //To navigate user to next page
  const [errors, setError] = useState(); // Storing error to Show error to user
  const [products, setProducts] = useState(null); // Storing products
  const [loaded, setLoaded] = useState(false); // Loading text till component rendering
  const [totalProducts, setTotalProducts] = useState(0); // Total Products fetched
  const [activeProductIndex, setActiveProductIndex] = useState(null);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      products: [],
    },
  });

  const { fields: productFields, update: updateProductField } = useFieldArray({
    control,
    name: "products",
  });

  // Api call to fetch Items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/getItems`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data)
        setProducts(data.response);
        setTotalProducts(data.response.length);
        const formattedProducts = data.response.map((product) => ({
          id: product._id,
          images: product.images,
          name: product.name,
          printName: product.printName,
          description: product.description || "",
          price: product.price || 0,
          currentStockQuantity: product.currentStockQuantity,
          productCategory: product.productCategory,
          unit: product.unit,
          isActive: product.isActive,
          specs: product.specifications?.length
            ? product.specifications
            : [{ key: "", value: "" }],
        }));

        reset({ products: formattedProducts });
        setLoaded(true);

        if (!response.ok) {
          setError("You are Unauthorized");
          return;
        }
      } catch (error) {
        // setError("Something went wrong \nUnable to Fetch the Products");
        setLoaded(true);
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
  }, [initialProducts, reset]);

  const addSpecField = (productIndex) => {
    const currentProduct = productFields[productIndex];
    const updatedSpecs = [...currentProduct.specs, { key: "", value: "" }];

    updateProductField(productIndex, {
      ...currentProduct,
      specs: updatedSpecs,
    });
  };

  const updateAll = () => {
    // navigate("/Dashboard");
    alert("Unable to process for Now!");
  };

  // Api call to update products
  const updateProduct = async (data, productIndex) => {
    try {
      const productToUpdate = data.products[productIndex];
      const originalProduct = products[productIndex];

      const filteredSpecs = productToUpdate.specs.filter(
        (spec) => spec.key.trim() !== "" && spec.value.trim() !== ""
      );

      const updatedProduct = {
        ...originalProduct,
        images: productToUpdate.images,
        description: productToUpdate.description,
        price: parseFloat(productToUpdate.price),
        specifications: filteredSpecs
      };


      console.log("Updating product:", updatedProduct);
      console.log(products);

      const response = await fetch(
        `${baseUrl}/updateItem?id=${originalProduct._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        console.log(productToUpdate.images)
        throw new Error("Failed to update product");
      }

      Swal.fire({
        title: "Updated",
        text: `${originalProduct.name} has been updated`,
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Error",
        text: `Failed to update Products`,
        icon: "error",
      });
    }
  };

 

  return (
    <>
      {loaded ? (
        errors ? (
          <ErrorBox errorName={errors} />
        ) : (
          <div className="flex p-2 flex-col w-[80%] mx-[10%]">
            <h1 className="text-center text-2xl font-bold border-b-2 p-2 mb-4">
              Fetched Products from Finance Module
              <p className="text-sm">
                {" "}
                Total Product Found ={" "}
                <span className="text-red-500">{totalProducts}</span>
              </p>
            </h1>
            {/* <div>
              <button
                className="border-2 p-2 px-4 float-right bg-green-400 font-bold rounded-lg"
                onClick={updateAll}
              >
                Update All Products
              </button>
            </div> */}

            <form
            className="snap-y snap-mandatory overflow-y-auto h-[600px] scroll-smooth"
              onSubmit={handleSubmit((data) => {
                console.log(data);
                if (activeProductIndex !== null) {
                  updateProduct(data, activeProductIndex);
                }
              })}
            >
              {productFields.map((product, productIndex) => (
                <div
                  key={product.id || productIndex}
                  className="m-2 border-2 p-2 rounded-xl snap-center"
                >
                  <p>{productIndex + 1}</p>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6"> Name: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.name}
                      readOnly
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6"> Images: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      placeholder="Enter Images url"
                      {...register(`products.${productIndex}.images`)}
                      onBlur={(e) => {
                        const imageArray = e.target.value.split(",").map((img) => img.trim());
                        updateProductField(productIndex, {
                          ...product,
                          images: imageArray,
                        });
                      }}
                    />
                    <p
                      className="lowercase m-2 rounded-[50%] bg-sky-300 px-2 text-sm p-1 cursor-alias"
                      title="Use Commas (,) to upload more than one Image"
                    >
                      i
                    </p>
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Print Name: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.printName}
                      readOnly
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Description: </p>
                    <textarea
                      cols={22}
                      rows={1}
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      placeholder="Set Description"
                      {...register(`products.${productIndex}.description`)}
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Price: </p>
                    <input
                      type="number"
                      step="0.01"
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      placeholder="Set Price"
                      {...register(`products.${productIndex}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">In Stock: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.currentStockQuantity}
                      readOnly
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Product Category: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.productCategory}
                      readOnly
                    />
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Unit: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.unit}
                      readOnly
                    />
                  </div>
                  {/* ADD SPECIFICATION */}
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Specs: </p>
                    <div>
                      {product.specs &&
                        product.specs.map((spec, specIndex) => (
                          <div key={specIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Enter Key"
                              className="border px-2 py-1 rounded-md w-1/2"
                              {...register(
                                `products.${productIndex}.specs.${specIndex}.key`
                              )}
                            />
                            <input
                              type="text"
                              placeholder="Enter Value"
                              className="border px-2 py-1 rounded-md w-1/2"
                              {...register(
                                `products.${productIndex}.specs.${specIndex}.value`
                              )}
                            />
                          </div>
                        ))}
                    </div>
                    <button
                      type="button"
                      className="px-2 py-1 mx-2 hover:bg-sky-200 transition-all text-center rounded-[50%] bg-sky-100"
                      onClick={() => addSpecField(productIndex)}
                    >
                      +
                    </button>
                  </div>
                  <div className="my-2 items-center capitalize font-bold text-black flex">
                    <p className="w-1/6">Active: </p>
                    <input
                      className="capitalize text-gray-700 border-2 px-4 py-1 rounded-xl"
                      value={product.isActive ? "Yes" : "No"}
                      readOnly
                    />
                  </div>
                  <div className="justify-self-end">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProductIndex(productIndex);
                        handleSubmit((data) =>
                          updateProduct(data, productIndex)
                        )();
                      }}
                      className="border-2 px-10 py-2 m-2 bg-green-400 rounded-xl font-bold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-center mx-5">Product End</p>
            </form>
          </div>
        )
      ) : (
        <div className="text-center p-10">Loading products...</div>
      )}
    </>
  );
};

export default ProductFetch;
