import mongoose, { Mongoose } from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderId : {
            type : String,
            required : true,
            unique : true
        },

        items : {
            type : [
                {
                    productId : {
                       type : String,
                       required : true
                    },

                    quantity : {
                       type : Number,
                       required : true
                    },

                    name : {
                        type : String,
                        required : true
                    }, 

                    price : {
                       type : Number,
                       required : true
                    },

                    image : {
                       type : String,
                       required : true
                    }
                }
            ]
        },

        customerName : {
            type : String,
            required : true,

        },

        email : {
            type : String,
            required : true
        },

        phone : {
            type : String,
            required : true
        },

        address : {
            type : String,
            required : true
        },

        total : {
            type : Number,
            required : true
        },

        status : {
            type : String,
            required : true,
            default : "Pending"
        },

        date : {
            type : Date,
            default : Date.now
        }
    }
)    

//connect databse collection and backend use mongoose model.
const Order = mongoose.model("Order", orderSchema);
export default Order;




