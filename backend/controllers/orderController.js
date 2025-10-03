import Order from "../models/order.js";
import Product from "../models/product.js"; // ✅ added
import { isAdmin } from "./userController.js";

export async function createOrder(req, res) {
  try {
    const user = req.user;
    if (user == null) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Get last order
    const orderList = await Order.find().sort({ date: -1 }).limit(1);
    let newOrderId = "CBC00001";

    if (orderList.length !== 0) {
      let lastOrderIdInString = orderList[0].orderId;
      let lastOrderNumber = parseInt(lastOrderIdInString.replace("CBC", ""));
      let newOrderNumber = lastOrderNumber + 1;
      let newOrderNumberInString = newOrderNumber.toString().padStart(5, "0");
      newOrderId = "CBC" + newOrderNumberInString;
    }

    // Customer details
    let customerName = req.body.customerName || `${user.firstName} ${user.lastName}`;
    let phone = req.body.phone || "Not provided";

    // Items validation
    const itemsInRequest = req.body.items;
    if (!itemsInRequest) {
      return res.status(400).json({ message: "Items are required to place an order" });
    }
    if (!Array.isArray(itemsInRequest)) {
      return res.status(400).json({ message: "Items should be an array" });
    }

    const itemsToBeAdded = [];
    let total = 0;

    for (let i = 0; i < itemsInRequest.length; i++) {
      const item = itemsInRequest[i];
      const product = await Product.findOne({ productId: item.productId });

      if (!product) {
        return res.status(400).json({
          code: "Not found",
          message: "Product with id " + item.productId + " not found",
          productId: item.productId,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          code: "stock",
          message: "Insufficient stock for product with Id " + item.productId,
          productId: item.productId,
          availableStock: product.stock,
        });
      }

      itemsToBeAdded.push({
        productId: product.productId,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });

      total += product.price * item.quantity;
    }

    // Save order
    const newOrder = new Order({
      orderId: newOrderId,
      items: itemsToBeAdded,
      customerName,
      email: user.email,
      phone,
      address: req.body.address,
      total,
      status: "Pending"
    });

    const savedOrder = await newOrder.save();

    //to update stock count when palced order...

    /*for (let i = 0; i<itemsToBeAdded.length; i++){
        const item = itemsToBeAdded[i];
        await Product.updateOne(
            { productId : item.productId },
            {$inc : {stock : -item.quantity}}
        )     
    }*/
     
        //or

    /*for(let i = 0; i<itemsToBeAdded.length; i++){
        const item = itemsToBeAdded[i];
        
        const product = await Product.findOne({productId: item.productId});
        const newQuantity = product.stock - item.quantity;

        await Product.updateOne(
            {productId : item.productId},
            {stock : newQuantity}
        )
    }*/


    res.status(201).json(
        { message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json(
        { message: "Internal server error" });
  }
}


//this api end point used for admin and customer view products...
export async function getOrders(req, res){

    if(isAdmin(req)){
        const orders = await Order.find().sort({date:-1})
        res.json(orders)
    } else if(isCustomer(req)){
        const user = req.user
        const orders = await Order.find({email: user.email}).sort({date:-1})
        res.json(orders)
    } else{
        res.status(403).json(
            {
                message : "You are not authorized to view orders"
            }
        )
    }
}

//for update order status by admin...
export async function updateOrderStatus(req, res){
   if(!isAdmin(req)){
    res.status(403).json(
      {
        message : "You are not authorized to update order status"
      })
      return;
   }
   const orderId = req.params.orderId;
   const newStatus = req.body.status;

   try{
     await Order.updateOne(
         {orderId : orderId},
         {status : newStatus}
     )

     res.json(
       {
         message : "Order status updated successfully"
       }
     );
   } catch(error){
    console.error(error)
    res.status(500).json({
      message : "Failed to update order status"
    })
    return;
   }
   
}

