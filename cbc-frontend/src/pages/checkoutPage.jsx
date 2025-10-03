import { MdOutlineAddBox } from "react-icons/md";
import { PiMinusSquareBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const [cart, setCart] = useState(location.state);

  // ✅ calculate total
  function getTotal() {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,
          customerName : name == "" ? null : name,
          items: items,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] overflow-y-scroll bg-primary flex flex-col pt-[40px] items-center">
      {/* responsive container */}
      <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
        {cart.map((item, index) => (
          <div
            className="w-full bg-white shadow-lg flex flex-col lg:flex-row relative items-center p-3 lg:p-0"
            key={index}
          >
            {/* delete button */}
            <button
              className="absolute lg:items-center right-[-50px] text-red-500 font-bold text-2xl rounded-full hover:bg-red-500 hover:text-white p-[5px] cursor-pointer"
              onClick={() => {
                const newCart = cart.filter((_, i) => i !== index);
                setCart(newCart);
              }}
            >
              <FaRegTrashCan />
            </button>

            {/* product image */}
            <img
              className="h-[100px] lg:h-[120px] aspect-square object-cover"
              src={item.image}
            />

            {/* product info */}
            <div className="w-full text-center lg:w-[200px] flex flex-col pl-[5px] pt-[10px]">
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <span className="text-sm text-secondary">{item.productId}</span>
            </div>

            {/* quantity controls */}
            <div className="w-full lg:w-[100px] h-[60px] lg:h-full flex flex-row justify-center items-center">
              <PiMinusSquareBold
                className="text-2xl cursor-pointer"
                onClick={() => {
                  const newCart = [...cart];
                  if (newCart[index].quantity > 1) {
                    newCart[index].quantity -= 1;
                  }
                  setCart(newCart);
                }}
              />
              <span className="font-semibold text-xl px-2">
                {item.quantity}
              </span>
              <MdOutlineAddBox
                className="text-2xl cursor-pointer"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                }}
              />
            </div>

            {/* pricing */}
            <div className="w-full lg:w-[180px] flex flex-row lg:flex-col items-center lg:items-end justify-center lg:justify-center">
              {item.labelledPrice > item.price && (
                <span className="text-secondary line-through text-lg text-center lg:text-right pr-[10px] lg:mt-[20px]">
                  LKR {item.labelledPrice.toFixed(2)}
                </span>
              )}
              <span className="font-semibold text-2xl text-accent text-center lg:text-right pr-[10px] lg:mt-[5px]">
                LKR {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* add text area for get user address and name */}
        <div className="w-full  bg-white shadow-lg flex flex-col justify-between items-center p-3 relative">
        <div className="w-full h-full flex flex-row justify-between items-center p-4">
            <label 
               htmlFor="name" 
               className="text-sm text-secondary">Full Name
            </label>
            <input 
               type="text" 
               id="name" 
               value={name} 
               onChange={(e)=> setCustomerName(e.target.value)} 
               className="w-[400px] h-[50px] text-center border border-secondary rounded-md px-3"
            />
          </div>
          <div className="w-full h-full flex flex-row justify-between items-center p-4">
            <label 
               htmlFor="address" 
               className="text-sm text-secondary mr-2">Shipping Address
            </label>
            <textarea 
               type="text" 
               id="address" 
               value={address} 
               onChange={(e)=> setAddress(e.target.value)} 
               className="w-[400px] h-[150px] text-center border border-secondary rounded-md px-3"
            />
          </div>
        </div>

        {/* total & checkout */}
        <div className="w-full h-[120px] bg-white shadow-lg flex flex-col-reverse lg:flex-row justify-between items-center p-3">
          <button
            onClick={purchaseCart}
            className="bg-accent text-white font-semibold text-lg w-[200px] h-[50px] flex justify-center items-center mt-3 lg:mt-0 hover:bg-accent/80"
          >
            Place Order
          </button>

          <span className="text-accent font-semibold text-2xl text-center lg:text-right w-full lg:w-auto">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
