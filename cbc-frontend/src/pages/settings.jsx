import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "/login";
        return;
    }

    axios.get(import.meta.env.VITE_API_URL + "/api/user/me", {
        headers: { 
            Authorization: "Bearer " + token, 
        },
    }).then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUser(res.data);

    }).catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    });
  }, []);

  async function updateUserData(){
    const data = {
        firstName : firstName,
        lastName : lastName,
        image : user.image,
    }
    if (image != null) {
       const link = await mediaUpload(image);
       data.image = link;
    }
    await axios.put(import.meta.env.VITE_API_URL + "/api/user/me", data, {
        headers : {
            Authorization : "Bearer " + localStorage.getItem("token"),
        },
    }).then(() => {
        toast.success("Profile updated successfully");
        navigate("/");
    }).catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile")
    });
  };

  async function updatePassword(){
    if(password !== confirmPassword){
        toast.error("Password do not match");
        return;
    }

    await axios.put(import.meta.env.VITE_API_URL + "/api/user/me/password", {
        password : password,
    },{
        headers : {
            Authorization : "Bearer " + localStorage.getItem("token"),
        },
    }).then(() =>{
        toast.success("Password updated successfully");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
    }).catch((error) => {
        console.error("Error updating password:", error);
        toast.error("Failed to update password");
    });
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Here you can call your backend API to update user data
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Changes saved successfully!");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center lg:flex-row bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat text-gray-100 p-4">
      {/* --- Left Section: Profile Picture + Basic Info --- */}
      <div className="w-full lg:w-[40%] backdrop-blur-2xl bg-white/10 rounded-2xl m-4 p-6 flex flex-col items-center justify-center shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Profile Details</h2>

        {/* Profile Image */}
        <div className="relative mb-6">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
            />
          ) : (
            <FaUserCircle className="text-9xl text-gray-400" />
          )}
          <label className="absolute bottom-0 right-0 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-300 transition">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Basic Info */}
        <div className="w-full flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* --- Right Section: Password Update --- */}
      <div className="w-full lg:w-[40%] backdrop-blur-2xl bg-white/10 rounded-2xl m-4 p-6 flex flex-col justify-center shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Security Settings</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition-all duration-200 shadow-lg"
        >
          <MdOutlineSaveAlt className="text-xl" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
