import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  //authorizaton part...
  async function updateProduct(){
     const token = localStorage.getItem("token");
     if(token == null){
      navigate("/login");
      return;
     }

     //create multiple promises for multiple file uploading...
     const promises = []; 
     for(let i=0; i<images.length; i++){
        promises[i] = mediaUpload(images[i]);
     }

     //run all promises on same time...
     try{
         let urls = await Promise.all(promises); //replace old images in new ones...

         if(urls.length == 0){
            urls = location.state.images //no update images, use previous ones...
         }
         //separate altternative name by comma...
         const alternativeNames = altNames.split(",");

         //create josn for sent data to backend...
         const product = {
          productId : productId,
          name : name,
          altNames : alternativeNames,
          description : description,
          images : urls,
          price : price,
          labelledPrice : labelledPrice,
          category : category,
          stock : stock
         }
         
         //add token to the post request...
         await axios.put(import.meta.env.VITE_API_URL + "/api/products/" + productId, product, {
          headers : {
            Authorization : "Bearer " + token
          }
         })

         toast.success("Product updated successfully");
         navigate("/admin/products");

        } catch(error){
         toast.error("An error occurred");
         console.error(error);
  }
}

  return (
    <div className="w-full h-full bg-secondary flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-secondary/40 p-8">
        <h2 className="text-2xl font-bold text-accent text-center mb-6">
          Update Product
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            disabled
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
            }}
          />

          <input
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Product Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            className="border border-secondary rounded-lg p-2 col-span-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Alternative Names (comma separated)"
            value={altNames}
            onChange={(e) => {
              setAltNames(e.target.value);
            }}
          />

          <textarea
            className="border border-secondary rounded-lg p-2 col-span-2 h-24 resize-none focus:ring-2 focus:ring-accent outline-none"
            placeholder="Product Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <input
            type="file"
            multiple
            className="col-span-2 border border-dashed border-accent rounded-lg p-3 bg-secondary/20 cursor-pointer"
            onChange={(e) => {
              setImages(e.target.files);
            }}
          />

          <input
            type="number"
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          <input
            type="number"
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Labelled Price"
            value={labelledPrice}
            onChange={(e) => {
              setLabelledPrice(e.target.value);
            }}
          />

          <select
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none col-span-1"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            <option value="cream">Cream</option>
            <option value="lotion">Lotion</option>
            <option value="serum">Serum</option>
            <option value="cleanser">Cleanser</option>
            <option value="Makeup">Makeup</option>
          </select>

          <input
            type="number"
            className="border border-secondary rounded-lg p-2 focus:ring-2 focus:ring-accent outline-none"
            placeholder="Stock"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6 gap-[20px]">
          <button onClick={()=>{
            navigate("/admin/products")
           }} className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition">
            Cancel
          </button>
          <button on onClick={updateProduct} className="bg-accent text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
