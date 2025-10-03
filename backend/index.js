import express from "express"; //import express framework.
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from  "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";

const app = express() // assign express into const vairable name app.

//middleware for accept request from anywhere...
app.use(cors());

dotenv.config(); //use to connect data from .env file...

/*function success(){
    console.log("Server is Started")
}*/

//app.listen(5000,success); //start express app using app.listen function with two parameters (portnumber, userdefined_function)

//middleware to parse JSON bodies.
app.use(express.json())

app.use(
    (req,res,next)=>{

       let token = req.header("Authorization")

       if(token != null){
        token = token.replace("Bearer ","") //use for remove "Bearer " from this token.

        //decrypt token.
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded)=>{
                if(decoded == null){
                    res.json({
                        message : "Invalid token please login again"
                    })
                    return // don't run anything below this line...
                } else{
                    req.user = decoded  // add user details to the request...
                }
            })
       }
       next() // if the token is correct, then pass the request to the correct destination...
    }
)


//connect database.
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected successfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
) //use for connect database.

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);


//start express server
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")  // in here we use arrow function instead of success function. 
})

