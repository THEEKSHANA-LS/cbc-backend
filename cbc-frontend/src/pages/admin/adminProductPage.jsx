import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

// 🟣 Popup component for confirming product deletion
function ProductDeleteConfirm(props) {
   const productId = props.productId; // product to delete
   const close = props.close; // function to close popup
   const refresh = props.refresh;

   // Function to delete product from backend
   function deleteProduct() {
    const token = localStorage.getItem("token"); // get stored token
    axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productId, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => {
      console.log(response.data);
      close(); // close popup after success
      toast.success("Successfully deleted product");
      refresh();
    })
    .catch(() => {
      toast.error("Failed to delete product");
    });
   }

   return (
   <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      {/* Popup box */}
      <div className="w-[500px] h-[200px] bg-primary relative rounded-2xl shadow-2xl">
          {/* Close button (X) */}
          <IoCloseSharp 
            onClick={close} 
            size={30} 
            className="absolute right-[-35px] top-[-35px] m-2 p-[1px] text-white bg-red-600 rounded-[100px] hover:bg-red-400 cursor-pointer"
          />

          {/* Confirmation message */}
          <p className="flex justify-center items-center pt-[60px] font-semibold">
            Are you sure you want to delete the product with product Id : {productId} ?
          </p>

          {/* Cancel and Yes buttons */}
          <div className="flex justify-center items-center gap-[30px] p-[20px]">
            <button 
              onClick={close} 
              className="bg-gray-900 hover:bg-gray-400 w-[80px] p-[5px] rounded-[5px] text-white cursor-pointer">
              Cancel
            </button>
            <button 
              onClick={deleteProduct} 
              className="bg-red-600 hover:bg-red-400 w-[80px] p-[5px] rounded-[5px] text-white cursor-pointer">
              Yes
            </button>
          </div>
      </div>
   </div>
   );
}

export default function AdminProductPage() {
  // 🟣 State variables
  const [products, setProducts] = useState([]); // all products
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false); // popup visibility
  const [productToDelete, setProductToDelete] = useState(null); // store selected product id
  const [isLoading, setIsLoading] = useState(true); 

  const navigate = useNavigate();

  // 🟣 Fetch all products when page loads
  useEffect(() => {
    if(isLoading){
      axios.get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data); // save products in state
        setIsLoading(false)
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-primary p-6">
      {/* Show delete confirmation popup when triggered */}
      {isDeleteConfirmVisible && 
        <ProductDeleteConfirm 
          refresh={()=>{setIsLoading(true)}}
          productId={productToDelete} 
          close={() => { setIsDeleteConfirmVisible(false) }}
        />
      }

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-accent mb-6">
        Manage Products
      </h1>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-secondary/50">
        {isLoading ? <Loader/> : <table className="w-full border-collapse">
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
                className={`${index % 2 === 0 ? "bg-white" : "bg-secondary/20"} hover:bg-secondary/40 transition`}
              >
                {/* Product Image */}
                <td className="p-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover shadow"
                  />
                </td>

                {/* Product Info */}
                <td className="p-3 font-semibold text-gray-700">{item.productId}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3 text-green-600 font-medium">Rs. {item.price}</td>
                <td className="p-3 line-through text-gray-500">Rs. {item.labelledPrice}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.stock}</td>

                {/* Actions (Delete + Edit) */}
                <td className="p-3">
                  <div className="flex flex-row gap-4 justify-center items-center">
                      {/* Delete button */}
                      <FaRegTrashCan 
                        size={18} 
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                        onClick={() => { 
                          setProductToDelete(item.productId); 
                          setIsDeleteConfirmVisible(true); 
                        }}
                      />

                      {/* Edit button */}
                      <TiEdit 
                        size={20} 
                        className="cursor-pointer text-accent hover:text-purple-800 transition" 
                        onClick={() => { navigate("/admin/update-product", { state: item }) }}
                      />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      {/* Floating Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-10 bottom-10 bg-accent text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition"
      >
        <IoMdAddCircleOutline size={28} />
      </Link>
    </div>
  );
}
