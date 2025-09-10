import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password, 10) // 10 is salting roundes. it means the same password hashing 10 times.

    const user =  new User(
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashedPassword,
        } 
    )

    user.save().then(
        ()=>{
            res.josn({
                message : "User created successfully."
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create user."
            })
        }
    )
}

export function loginUser(req,res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.json(
                    {
                        message: "User not found"
                    }
                )
            } else{
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
                if(isPasswordMatching){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isEmailVerified : user.isEmailVrified
                        },
                        "jwt-secret"
                    )


                    res.json(
                        {
                            message : "Login successful",
                            token : token
                        }
                    )
                } else {
                    res.json(
                        {
                            message : "Invalid password"
                        }
                    )
                }
            }
        }
    )
}

//Authorization part...
export function isAdmin(req){
    if(req.user == null){
        return false;
    }

    if(req.user.role != "admin"){
        return false;
    }

    return true;
}

