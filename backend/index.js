import express from "express"; //import express framework.
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from  "jsonwebtoken";
import productRouter from "./routes/productRouter.js";

const app = express() // assign express into const vairable name app.

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
        jwt.verify(token, "jwt-secret",
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
const connectionString = "mongodb+srv://admin:1234@cluster0.51kmbrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected successfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
) //use for connect database.

app.use("/user", userRouter);
app.use("/products", productRouter);


//start express server
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")  // in here we use arrow function instead of success function. 
})

