import { Link } from "react-router-dom";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import UserData from "./userData";

export default function Header(){

    const [isSliderbarOpen, setSliderbarOpen] = useState(false);
     
    return(
        <header className="w-full bg-accent h-[100px] text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="logo.png" className="h-full hidden lg:flex w-[170px] left-[0px] object-cover"/>
                <div className="w-full lg:hidden flex justify-center items-center relative">
                     <MdMenu 
                        size={30} 
                        className="absolute left-0 cursor-pointer"
                        onClick={()=> setSliderbarOpen(true)}
                    />
                     <img src="logo.png" className="h-full w-[170px] left-[0px] object-cover"/>
                </div>

                {
                    isSliderbarOpen &&
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] z-100">
                       <div className="w-[300px] h-full bg-primary flex flex-col">
                         <div className="w-full lg:hidden h-[100px] bg-accent flex justify-center items-center relative">
                           <MdMenu 
                              size={30} 
                              className="absolute left-8 cursor-pointer"
                              onClick={()=> setSliderbarOpen(false)}
                            />
                            <img src="logo.png" className="h-full w-[170px] left-[0px] object-cover"/>
                         </div>
                         <div className="flex flex-col text-secondary font-semibold">
                            <a href="/" className="p-4 border-b border-secondary/10">Home</a>
                            <a href="/products" className="p-4 border-b border-secondary/10">Products</a>
                            <a href="/about" className="p-4 border-b border-secondary/10">About</a>
                            <a href="/contact" className="p-4 border-b border-secondary/10">Contact</a>
                            <a href="/cart" className="p-4 border-b border-secondary/10">Cart</a>
                            <div className="lg:hidden flex w-[300px] absolute bottom-[80px] ml-5 justify-start items-center gap-4">
                               <UserData/>  
                            </div>
            
                         </div>
                       </div>
                    </div>
                }

                <div className="hidden h-full lg:flex justify-center items-center ml-[-70px] w-full gap-[20px] text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="h-full hidden lg:flex w-[200px] absolute right-[100px] top-0 justify-end items-center gap-4">
                  <UserData/>  
                </div>
            
                <Link to="/cart" className="h-full absolute right-0 hidden lg:flex justify-center items-center text-3xl">
                   <MdOutlineShoppingCart/>
                </Link>
            </div>
        </header>
    )
}


