import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

// 🟣 Popup for confirming product deletion
function ProductDeleteConfirm({ productId, close, refresh }) {
  function deleteProduct() {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/products/" + productId, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Successfully deleted product");
        close();
        refresh();
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-accent/40 z-[100] flex justify-center items-center px-4">
      <div className="w-full max-w-[450px] bg-primary relative rounded-2xl shadow-2xl p-6">
        {/* Close button */}
        <IoCloseSharp
          onClick={close}
          size={28}
          className="absolute right-3 top-3 text-red-600 hover:text-red-400 cursor-pointer"
        />
        {/* Text */}
        <p className="text-center font-medium mt-6 mb-6 text-accent">
          Are you sure you want to delete the product with ID:
          <span className="font-semibold text-secondary"> {productId}</span>?
        </p>
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-lg text-primary transition"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg text-primary transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen bg-primary p-4 md:p-6 relative">
      {/* Delete confirmation popup */}
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          refresh={() => setIsLoading(true)}
          productId={productToDelete}
          close={() => setIsDeleteConfirmVisible(false)}
        />
      )}

      {/* Title */}
      <h1 className="text-2xl font-bold text-accent mb-6 text-center md:text-left">
        Manage Products
      </h1>

      {/* Product Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-secondary/50">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-secondary text-accent">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product Id</th>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Labelled Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={item.productId}
                  className={`${
                    index % 2 === 0 ? "bg-primary" : "bg-secondary/10"
                  } hover:bg-secondary/30 transition`}
                >
                  <td className="p-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover shadow"
                    />
                  </td>
                  <td className="p-3 font-semibold text-gray-700">
                    {item.productId}
                  </td>
                  <td className="p-3 text-accent">{item.name}</td>
                  <td className="p-3 text-green-600 font-medium">
                    Rs. {item.price}
                  </td>
                  <td className="p-3 line-through text-gray-500">
                    Rs. {item.labelledPrice}
                  </td>
                  <td className="p-3 text-gray-700">{item.category}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <FaRegTrashCan
                        size={18}
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                        onClick={() => {
                          setProductToDelete(item.productId);
                          setIsDeleteConfirmVisible(true);
                        }}
                      />
                      <TiEdit
                        size={20}
                        className="cursor-pointer text-secondary hover:text-purple-800 transition"
                        onClick={() =>
                          navigate("/admin/update-product", { state: item })
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile View: Card Layout */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {isLoading ? (
          <Loader />
        ) : (
          products.map((item) => (
            <div
              key={item.productId}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 border border-secondary/30"
            >
              <div className="flex justify-between items-center border-b pb-2 border-gray-200">
                <h2 className="font-bold text-lg text-accent">{item.name}</h2>
                <div className="flex gap-3">
                  <TiEdit
                    size={20}
                    className="text-secondary hover:text-purple-800 cursor-pointer"
                    onClick={() =>
                      navigate("/admin/update-product", { state: item })
                    }
                  />
                  <FaRegTrashCan
                    size={18}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => {
                      setProductToDelete(item.productId);
                      setIsDeleteConfirmVisible(true);
                    }}
                  />
                </div>
              </div>

              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />

              <div className="text-sm text-gray-700 space-y-1 pt-1">
                <p>
                  <span className="font-semibold text-accent">ID:</span> {item.productId}
                </p>
                <p>
                  <span className="font-semibold text-accent">Category:</span>{" "}
                  {item.category}
                </p>
                <p>
                  <span className="font-semibold text-accent">Stock:</span> {item.stock}
                </p>
                <p>
                  <span className="font-semibold text-green-600">
                    Rs. {item.price}
                  </span>{" "}
                  <span className="line-through text-gray-500 text-xs">
                    Rs. {item.labelledPrice}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-5 bottom-5 bg-accent text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
      >
        <IoMdAddCircleOutline size={28} />
      </Link>
    </div>
  );
}