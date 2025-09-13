import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  // get request to fetch all products...
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="w-full h-full bg-primary p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-accent mb-6">
        Manage Products
      </h1>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-secondary/50">
        <table className="w-full border-collapse">
          <thead className="bg-secondary text-accent">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product Id</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Labelled Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={item.productId}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-secondary/20"
                } hover:bg-secondary/40 transition`}
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
                <td className="p-3">{item.name}</td>
                <td className="p-3 text-green-600 font-medium">
                  Rs. {item.price}
                </td>
                <td className="p-3 line-through text-gray-500">
                  Rs. {item.labelledPrice}
                </td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <FaRegTrashCan size={18} />
                    </button>
                    <button className="text-accent hover:text-purple-800 transition">
                      <TiEdit size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-10 bottom-10 bg-accent text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition"
      >
        <IoMdAddCircleOutline size={28} />
      </Link>
    </div>
  );
}
