import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


//post function...
export async function createProduct(req,res){

    /*if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        });
        return;
    }

    if(req.uesr.role != "admin"){
        req.status(403).json({
            message : "You are not authorized to create a product"
        });
        return;
    }
    ))*/
    
    //authorization part...
    if(!isAdmin(req)){
      res.status(403).json({
        message : "You are not authorized to create a product"
      });
      return;
    }

    try{
        const productData = req.body;
        const product = new Product(productData);

        await product.save();

        res.json({
            Message : "Product created successfully",
            product : product,
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to create product",
        });
    }
}

//get function...
export async function getProducts(req,res){
    try{
        const products = await Product.find()
        res.json(products);
    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to retrieve products",
        });
    }
}

//delete function...
export async function deleteProduct(req,res){

    //authorization part...
    if(!isAdmin(req)){
        res.status(403).json({
          message : "You are not authorized to delete a product"
        });
        return;
    }

    try{
        const productId = req.params.productId;
       
        await Product.deleteOne({
            productId : productId
        });

        res.json({
            message : "Product delete successfully"
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to delete product",
        });
    }
}

//update function...
export async function updateProduct(req,res){

    //authorization part...
    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to update a product"
        });
        return;
    }
    
    try{
       const productId = req.params.productId;
       const updateData = req.body;

       await Product.updateOne(
        {productId : productId},
        updateData
       );

       res.json({
        message : "Product updated successfully",
       });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to update product",
        });
    }
}

//get specific product using productId...
export async function getProductId(req,res){
    try{
        const productId = req.params.productId;

        const product = await Product.findOne({
            productId : productId
        })

        if(product == null){
            res.status(404).json({
                message : "Product not found",
            });
        } else{
            res.json(product);
        }
    } catch(error){
        console.error(error);
        res.status(500).json({
            message : "Failed to retrieve product by id",
        });
    }
}

//search products...
export async function searchProducts(req, res){
   try{
    const query = req.params.query;

    const products = await Product.find(
        {
            $or : [
            {
                name : { $regex : query, $options : "i"}
            },
            {
                altNames : {$elemMatch : {$regex : query, $options : "i"}}
            }
        ]
        }
    );
    res.json(products);

   } catch(error){
    console.error(error);
    res.status(500).json({
        message : "Failed to search products",
    });
   }
}
