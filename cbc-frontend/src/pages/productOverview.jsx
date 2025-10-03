import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom"
import Loader from "../components/loader.jsx";
import ImageSlider from "../components/imageSlider.jsx";
import { addToCart, loadCart } from "../utils/cart.js";

export default function ProductOverview(){

    const params = useParams();
    //loading, success, error

    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    
    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.Id).then(
            (res)=>{
                setProduct(res.data);
                setStatus("success");
            }
        ).catch(
            ()=>{
                toast.error("Failed to fetch prodcut details");
                setStatus("error");
            }
        )
    }, [])

    return(
        <div className="w-full lg:min-h-[calc(100vh-100px)] text-secondary bg-primary">
          {
            status == "loading" && <Loader/>
          }
          {
            status == "success" && (
                <div className="w-full flex flex-col lg:flex-row p-10">
                     <h1 className="text-2xl font-bold text-center lg:hidden">{product.name}</h1>
                    {/* Image Slider part in left side */}
                    <div className="w-full lg:w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images}/>
                    </div>

                    {/* Product details part in right side */}
                    <div className="w-full lg:w-[50%] h-full flex flex-col justify-center items-center mt-10 gap-4">
                        <span className="">{product.productId}</span>
                        <h1 className="text-2xl font-bold text-center">{product.name}
                            {
                                product.altNames.map(
                                   (name, index)=>{
                                    return(
                                        <span key={index} className="text-md font-normal text-secondary/70">{" | " + name}</span>
                                    )
                                }
                                )
                            }
                        </h1>
                        <p className="mt-[30px] text-justify">{product.description}</p>
                        <p>Category : {product.category}</p>
                        {
                           product.labelledPrice > product.price ? 
                           <div className="flex gap-3 items-center">
                            <p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
                            <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                           </div> : 
                           <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                        }
                        
                        {/*Add to cart and BuyNow buttons*/}
                        <div className="w-full h-[40px] flex gap-4 mt-[60PX]">
                           <button onClick={()=>{
                            addToCart(product, 1);
                            toast.success("Added to cart");
                           }} className="w-[50%] h-full bg-accent text-white font-semibold hover:bg-accent/80">Add to Cart</button>

                           <Link to="/checkout" state={[{
                              image : product.images[0],
                              productId : product.productId,
                              name : product.name,
                              price : product.price,
                              labelledPrice : product.labelledPrice,
                              quantity : 1
                           }]}className="w-[50%] h-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white flex justify-center items-center">Buy Now</Link>
                        </div>
                    </div>
                </div>
            )
          }
          {
            status == "error" && <h1 className="text-red-500">Failed to load product details</h1>
          }
        </div>
    )
}

