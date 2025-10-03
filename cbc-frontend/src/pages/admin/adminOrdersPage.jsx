import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function AdminOrderPage() {
  // 🟣 State variables
  const [orders, setOrders] = useState([]); // all products
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsMoadlOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // selected product for details
  const [status, setStatus] = useState(selectedOrder?.status);

  const navigate = useNavigate();

  // 🟣 Fetch all products when page loads
  useEffect(() => {
    if(isLoading){
        const token = localStorage.getItem("token");
        if(token == null){
            navigate("/login");
            return;
        }
       axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
        headers : {
            Authorization : "Bearer " + token
        },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data); // save products in state
        setIsLoading(false)
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full">
        {isModalOpen && selectedOrder && (
  <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
    <div className="w-[600px] max-h-[80vh] overflow-y-auto bg-primary rounded-2xl relative flex flex-col p-6 shadow-xl">
      
      {/* Close Button */}
      <button
        onClick={() => setIsMoadlOpen(false)}
        className="absolute top-3 right-3 text-red-600 font-bold text-lg hover:scale-110 transition"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-xl font-bold text-accent mb-4">
        Order Details - {selectedOrder.orderId}
      </h2>

      {/* Customer Info */}
      <div className="mb-4 space-y-1">
        <p><span className="font-semibold">Customer:</span> {selectedOrder.customerName}</p>
        <p><span className="font-semibold">Email:</span> {selectedOrder.email}</p>
        <p><span className="font-semibold">Phone:</span> {selectedOrder.phone}</p>
        <p><span className="font-semibold">Address:</span> {selectedOrder.address}</p>
        <p><span className="font-semibold">Current Status:</span> {selectedOrder.status}</p>
        <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
      </div>

      {/* 🔹 Admin Status Selector (UI only) */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-accent">Change Order Status:</label>
        <select
          className="w-full p-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
          <option value="Refunded">Refunded</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          className="mt-3 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition"
          onClick={()=>{
            const token = localStorage.getItem("token");
            axios.put(`${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderId}`, {
                status:status
              }, {
                headers: { Authorization: "Bearer " + token }
              })
               .then(()=>{
                toast.success("Order status updated successfully");
                setIsMoadlOpen(false);
                setIsLoading(true);
            }).catch((error)=>{
                toast.error("Failed to update order status");
                console.error(error);
            })
          }}
          disabled={status == selectedOrder.status}
        >
          Save Status
        </button>
      </div>

      {/* Items Table */}
      <h3 className="text-lg font-semibold text-accent mb-2">Items</h3>
      <table className="w-full text-sm border border-secondary rounded-lg overflow-hidden">
        <thead className="bg-secondary text-accent">
          <tr>
            <th className="p-2 text-left">Image</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder.items.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-secondary/20">
              <td className="p-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
              </td>
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-right">LKR {item.price.toFixed(2)}</td>
              <td className="p-2 text-right">LKR {(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold text-accent">
          Total: LKR {selectedOrder.total.toFixed(2)}
        </p>
      </div>
    </div>
  </div>
)}


    <div className="w-full h-full bg-primary p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-accent mb-6">
        Review Orders
      </h1>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-secondary/50">
        {isLoading ? <Loader/> : <table className="w-full border-collapse">
          <thead className="bg-secondary text-accent">
            <tr>
              <th className="p-3 text-left">Order Id</th>
              <th className="p-3 text-left">Number Of Items</th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>

            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item.orderId}
                className={`${index % 2 === 0 ? "bg-white" : "bg-secondary/20"} hover:bg-secondary/40 cursor-pointer transition`}
                onClick={()=>{
                    setSelectedOrder(item);
                    setIsMoadlOpen(true);
                }}
              >
                {/* Order Info */}
                <td className="p-3 font-semibold text-gray-700">{item.orderId}</td>
                <td className="p-3 text-green-600 text-center font-medium">{item.items.length}</td>
                <td className="p-3">{item.customerName}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.address}</td>
                <td className="p-3 font-bold text-lg text-accent">LKR {item.total.toFixed(2)}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
    </div>
  );
}
