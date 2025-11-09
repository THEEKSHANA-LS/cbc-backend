import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Loader from "../components/loader.jsx";
import axios from "axios";
import ProductCard from "../components/productCard.jsx";

export default function ProductPage(){

    const[products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
           axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
            (response)=>{
                setProducts(response.data);
                setIsLoading(false);
            }
           ).catch((error)=>{
            console.error("Error fecthing products: ", error);
            setIsLoading(false);
            toast.error("Failed to load products");
           });
        }
    }, [isLoading])

    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-gradient-to-b from-gray-900 to-black">
            <div className="w-full h-[100px] flex justify-center items-center">
                <input 
                  type = "text"
                  onChange = {
                    async (e) => {
                        try{
                            if(e.target.value == ""){
                                setIsLoading(true);
                            } else{
                                const searchResults = await axios.get(import.meta.env.VITE_API_URL + "/api/products/search/" + e.target.value);
                                setProducts(searchResults.data);   
                            }
                        } catch(error){
                            toast.error("Search failed");
                        }
                    }
                  }
                  placeholder="Search products..."
                  className="w-[50%] h-[40px] rounded-md px-4 focus:outline-none border-2 bg-accent"
                />
            </div>
            {
                isLoading ? <Loader/> : 
                <div className="w-full h-full flex flex-row flex-wrap justify-center">
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productId} product={item}/>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}


