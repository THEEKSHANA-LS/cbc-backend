import { addToCart, getTotal, loadCart } from "../utils/cart.js"
import { MdOutlineAddBox } from "react-icons/md";
import { PiMinusSquareBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage(){
    
    const [cart, setCart] = useState(loadCart());

    return(
        <div className="w-full min-h-screen text-secondary bg-gradient-to-b from-gray-900 to-black flex flex-col items-center py-10 px-3">
            <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
                {
                    cart.map((item, index)=>{
                        return(
                            <div className="w-full h-[300px] rounded-xl lg:h-[120px] bg-white shadow-lg flex flex-col lg:flex-row relative items-center p-3 lg:p-0" key={index}>
                                <button className="absolute text-red-500 right-[-50px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] cursor-pointer" onClick={
                                    ()=>{
                                        addToCart(item,-item.quantity);
                                        setCart(loadCart());
                                    }
                                }><FaRegTrashCan/></button>
                                <img className="h-[100px] lg:h-full rounded-xl aspect-square object-cover" src={item.image}/>
                                <div className="w-full text-center lg:items-center justify-center lg:w-[200px] h-[100px] lg:h-full flex flex-col pl-[5px] pt-[10px]">
                                    <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productId}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-row justify-center items-center">
                                   <PiMinusSquareBold className="text-2xl cursor-pointer" onClick={
                                    ()=>{
                                        addToCart(item,-1);
                                        setCart(loadCart());
                                    }
                                   }/>
                                   <span className="font-semibold text-xl pl-2 pr-2">{item.quantity}</span>
                                   <MdOutlineAddBox className="text-2xl cursor-pointer" onClick={
                                    ()=>{
                                        addToCart(item,1);
                                        setCart(loadCart());
                                    }
                                   }/>
                                </div>
                                <div className="w-full lg:w-[180px] lg:h-full items-center justify-center flex flex-row lg:flex-col">
                                   {
                                    item.labelledPrice > item.price && 
                                    <span className="text-secondary line-through lg:w-full text-lg text-center lg:text-right pr-[10px] lg:mt-[20px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                   }
                                   <span className="font-semibold text-2xl lg:w-full text-accent text-center lg:text-right pr-[10px] lg:mt-[5px]">LKR {item.price.toFixed(2)}</span>
                                </div>

                            </div>
                        )
                    })
                }
                            <div className="w-[400px] lg:w-full rounded-xl h-[120px] bg-white shadow-lg flex flex-col-reverse lg:flex-row justify-end items-center relative p-3 mb-5">
                                <Link state={cart} to="/checkout" className="lg:absolute left-0 bg-accent text-white font-semibold text-lg w-[200px] h-[50px] flex justify-center items-center lg:ml-[20px] hover:bg-accent/80">Proceed To Checkout</Link>
                               <div className="h-[50px]">
                                 <span className=" text-accent font-semibold w-full text-center flex items-center lg:text-right text-2xl p-0 lg:pr-[10px] mt-[5px]">Total : LKR {getTotal().toFixed(2)}</span>
                               </div>
                            </div>
            </div>
        </div>
    )
}


 