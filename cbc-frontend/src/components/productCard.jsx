import { Link } from "react-router-dom";

export default function ProductCard(props){

    const product = props.product;

    return(
       <div className="w-[300px] h-[400px] shadow-2xl m-[6px] flex flex-col bg-primary p-[10px]">
         <img className="w-full h-[250px] object-cover" src={product.images[0]}/>
         <h1 className="text-xl font-bold text-accent">{product.name}</h1>
         {
            product.labelledPrice > product.price ?
            <div className="flex gap-3 items-center">
               <p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
               <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
            </div> :
            <p className="text-lg text-secondary font-semibold">LKR {product.price.toFixed(2)}</p>
         }
         <p className="text-sm text-secondary/70">{product.productId}</p>
         <p className="text-sm text-secondary/70">{product.category}</p>
         <Link to={"/overview/" + product.productId} className="w-full h-[30p] border border-accent text-accent hover:bg-accent hover:text-white cursor-pointer flex justify-center mt-[5px]">View Product</Link>
         
       </div>
    )
}

