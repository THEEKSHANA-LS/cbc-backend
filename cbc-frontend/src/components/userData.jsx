import { useEffect, useState } from "react";
import axios from "axios";
import Loader  from "../components/loader.jsx"

export default function UserData(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogoutConfirmOpen, setIsLoogoutConfirmOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if(token != null){
            axios.get(import.meta.env.VITE_API_URL + "/api/user/me", {
                headers: {
                    Authorization : "Bearer " + token,
                },
            }).then((res) => {
                setUser(res.data);
                setLoading(false);
            }).catch((error) => {
                localStorage.removeItem("token");
                setUser(null);
                setLoading(false);
            });
        } else{
            setLoading(false);
        }
    },[]);

    return(
        <div className="flex justify-center items-center">
            {
                isLogoutConfirmOpen && 
                    <div className="fixed z-[120] w-full h-screen top-0 left-0 bg-black/20">
                        <div className="w-[320px] h-[150px] bg-primary rounded-lg p-4 flex flex-col justify-between items-center ml-[150px] mt-[250px] lg:ml-[700px] lg:mt-[250px]">
                          <span className="text-lg text-black">Are you sure you want to logout ?</span>
                          <div className="w-full flex justify-around">
                            <button 
                               className="bg-accent text-white px-4 py-2 rounded hover:bg-amber-500" 
                               onClick={() => {localStorage.removeItem("token");
                               window.location.href = "/login";
                               }}>
                                 Yes
                            </button>
                            <div className="w-ull flex justify-center">
                                <button 
                                  className="bg-accent text-white px-4 py-2 rounded hover:bg-amber-500"
                                  onClick={() => {
                                    setIsLoogoutConfirmOpen(false);
                                  }}>
                                  Cancel    
                                </button>      
                            </div>
                          </div>
                        </div>
                    </div>

                
            }
           {
            loading && <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin"/>
           }
           {
            user && <div className="h-full w-full flex justify-center items-center">
               <img src={user.image} className="w-[40px] h-[40px] rounded-full border-[2px] border-primary"/>
               <span className="ml-2">{user.firstName}</span>
               <select onChange={
                (e) => {
                    if(e.target.value == "logout"){
                        setIsLoogoutConfirmOpen(true);
                    }
                }
               }className="ml-2 bg-accent max-w-[20px] text-white p-1 rounded">
                <option></option>
                <option>Account Settings</option>
                <option value={"logout"}>Logout</option>
                <option>Orders</option>
               </select>
            </div>
            } 

            {
                (!loading && user == null) && <a href="login" className="bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition">Login</a>
            }
        </div>
    )
}
