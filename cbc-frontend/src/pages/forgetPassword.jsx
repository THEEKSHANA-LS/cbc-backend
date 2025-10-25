import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword(){

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    //function for send otp...
    async function sendOTP(){
        try{
          await axios.get(import.meta.env.VITE_API_URL + "/api/user/send-otp/" + email);
          toast.success("OTP sent to youe email." + email);
          setStep("otp");

        } catch(error){
          console.error(error);
          toast.error("Failed to send OTP. Please try again.")
        }
    }

    //function for change password...
    async function changePassword(){

        if(newPassword !== confirmPassword){
            toast.error("Password do not match.");
            return;
        }
        try{
            await axios.post(import.meta.env.VITE_API_URL + "/api/user/change-password/", {
                email : email,
                otp : otp,
                newPassword : newPassword
            });
            toast.success("Password changed successfully. Please login with your new password.");
            navigate("/login");
            
        } catch(error){
            console.error(error);
            toast.error("OTP is invalied. Please try again.")
        }
    }



 return(
    <div className="w-full h-screen flex justify-center items-center bg-[url('/bg.jpg')] bg-cover bg-center">
      { step == "email" && <div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center shadow-lg">
        <h1 className="text-2xl font-semibold text-secondary text-center mb-6">Reset Pssword</h1>
        <input 
          type="email" 
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          placeholder="Enter your email" 
          className="w-[80%] h-12 flex justify-center rounded-lg px-4 mb-4 shadow-lg bg-secondary/20"/>
        <button className = "w-[80%] bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition" onClick={sendOTP}>Send OTP</button>
      </div> }

      { step == "otp" && <div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center shadow-lg">
        <h1 className="text-2xl font-semibold text-secondary text-center mb-6">Reset Pssword</h1>
        <input 
          type="text" 
          value = {otp}
          onChange = {(e) => setOtp(e.target.value)}
          placeholder="Enter your otp" 
          className="w-[80%] h-12 flex justify-center rounded-lg px-4 mb-4 shadow-lg bg-secondary/20"/>

        <input 
          type="password" 
          value = {newPassword}
          onChange = {(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password" 
          className="w-[80%] h-12 flex justify-center rounded-lg px-4 mb-4 shadow-lg bg-secondary/20"/>

<input 
          type="password" 
          value = {confirmPassword}
          onChange = {(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password" 
          className="w-[80%] h-12 flex justify-center rounded-lg px-4 mb-4 shadow-lg bg-secondary/20"/>
        <button className = "w-[80%] bg-accent text-white p-3 rounded-lg hover:bg-accent/90 transition" onClick={changePassword}>Change Password</button>
      </div> }
    </div>
 )
}