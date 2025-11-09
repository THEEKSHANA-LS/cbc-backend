import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import OTP from "../models/otpModel.js";
import generateOtpEmail from "../lib/emailDesign.js"

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

// ✅ Send Contact Message Controller
export const sendContactMessage = async (req, res) => {
    const { fullName, email, message } = req.body;
  
    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }
  
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send back to the user's email
        subject: "Thank you for contacting Casual Club 💬",
        html: `
          <h2>Hello ${fullName},</h2>
          <p>Thank you for reaching out to <strong>Casual Club</strong>.</p>
          <p>We’ve received your message:</p>
          <blockquote>${message}</blockquote>
          <p>Our team will get back to you within 24 hours.</p>
          <br/>
          <p>Warm regards,<br/>Casual Club Team</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ message: "Failed to send email." });
    }
};
  

//sign up process...
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

//login process...
export function loginUser(req,res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.status(404).json(
                    {
                        message: "User not found"
                    }
                )
            } else{

                if(user.isBlock){
                    res.status(403).json({
                        message : "Your account has been blocked. Please contact admin."
                    });
                    return;
                }
                const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
                if(isPasswordMatching){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isEmailVerified : user.isEmailVrified,
                            image : user.image
                        },
                        process.env.JWT_SECRET
                    )


                    res.json(
                        {
                            message : "Login successful",
                            token : token,
                            user : {
                                email : user.email,
                                firstName : user.firstName,
                                lastName : user.lastName,
                                role : user.role,
                                isEmailVerified : user.isEmailVrified
                            }
                        }
                    )
                } else {
                    res.status(401).json(
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

//for get user in header icon...
export function getUser(req, res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return;
    } else{
        res.json(
            req.user
        )
    }
}

//google login...
export async function googleLogin(req, res) {
    const token = req.body.token;
  
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
  
    try {
      const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const googleUser = googleResponse.data;
  
      let user = await User.findOne({ email: googleUser.email });
  
      if (!user) {
        user = new User({
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          password: "abc",
          isEmailVerified: googleUser.email_verified,
          image: googleUser.picture,
        });
        await user.save();
      } else{
        if(user.isBlock){
            res.status(403).json({
                message : "Your account has been blocked. Please contact admin."
            });
            return;
        }
      }
  
      const jwtToken = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          image: user.image,
        },
        process.env.JWT_SECRET
      );
  
      res.json({
        message: "Login successful!",
        token: jwtToken,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          image: user.image,
        },
      });

      if(user.isBlock){
        res.status(403).json({
            message : "Your account has been blocked. Please contact admin."
        });
        return;
    }

    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({ message: "Failed to login with google." });
    }
  }
  

//for get all user details...
export async function getAllUsers(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Forbidden"
        });
        return;
    }
    try{
       const users = await User.find();
       res.json(users);
    } catch(error){
       res.status(500).json({
        message : "Failed to get users."
       });
    }
}

//block or unblock user by admin...
export async function blockOrUnblockUser(req, res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Forbidden"
        });
        return;
    }

    if(req.user.email === req.params.email){
        res.status(400).json({
            message : "You can not block yourself."
        });
        return;
    }

    try{
        await User.updateOne({
            email : req.params.email
        },{
            isBlock : req.body.isBlock
        })

        res.json({
            message : "User block status updated successfully."
        })

    } catch(error){
        res.status(500).json({
            message : "Failed to block/unblock user."
        });
    }
}

//send otp to email...
export async function sendOTP(req, res) {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000);
  
    try {
      console.log("Step 1: Deleting old OTPs...");
      await OTP.deleteMany({ email });
  
      console.log("Step 2: Saving new OTP...");
      const newOTP = new OTP({ email, otp });
      await newOTP.save();
  
      console.log("Step 3: Sending email to", email);
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Password Reset",
        html : generateOtpEmail(otp),
      });
  
      console.log("Step 4: Email sent successfully");
  
      res.json({ message: "OTP sent to your email." });
  
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP.", error: error.message });
    }
}
  
// verify otp and change password...
export async function changePasswordViaOTP(req, res){
   const email = req.body.email;
   const otp = req.body.otp;
   const newPassword = req.body.newPassword;
 try{
   const otpRecord = await OTP.findOne({
    email : email,
    otp : otp
   });

   if(otpRecord == null){
    res.status(400).json({
        message : "Invalid OTP."
    });
    return;
   }

   await OTP.deleteMany({
    email : email
   });

   const hashedPassword = bcrypt.hashSync(newPassword, 10);
   
     await User.updateOne({
        email : email
     },{
        password : hashedPassword
     });

     res.json({
        message : "Password changed successfully."
     });
   } catch(error){
      res.status(500).json({
        message : "Failed to change password."
      });
   }
}

// ✅ Unified update profile controller
export async function updateUserProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updates = {};

    // Update name
    if (req.body.firstName) updates.firstName = req.body.firstName;
    if (req.body.lastName) updates.lastName = req.body.lastName;

    // Update image
    if (req.body.image) updates.image = req.body.image;

    // Update password (only if provided)
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      updates.password = hashedPassword;
    }

    await User.updateOne({ email: req.user.email }, { $set: updates });

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
}
