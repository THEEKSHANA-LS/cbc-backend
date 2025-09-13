import { useState } from "react";

export default function TestPage(){

    const [count, setCount] = useState(0);
    const [state, setState] = useState("Online");

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex flex-col justify-center items-center gap-[25px]">
                <div className="flex justify-center items-center gap-[20px]">
                <button onClick={
                    ()=>{
                        console.log("Decreasing...");
                        setCount(count - 1);
                    }
                } className="w-[100px] h-[40px] bg-accent rounded-lg">-</button>

                <span className="text-accent text-5xl">
                    {count}
                </span>

                <button onClick={
                    ()=>{
                        console.log("Increasing...");  
                        setCount(count + 1);        
                    }
                }className="w-[100px] h-[40px] bg-accent rounded-lg">+</button>   
                </div>  

                <div className="flex flex-col justify-center items-center">
                    <span className="text-accent text-5xl">
                        {state}
                    </span>

                    <div className="flex flex-row gap-[20px] p-[10px]">
                    <button onClick={
                        ()=> {
                            setState("Offline");
                        }
                    }className="w-[100px] h-[40px] bg-accent rounded-lg">Offline</button>
                    <button onClick={
                        ()=>{
                            setState("Online");
                        }
                    }className="w-[100px] h-[40px] bg-accent rounded-lg">Online</button>
                    <button onClick={
                        ()=>{
                            setState("Disconnect");
                        }
                    }className="w-[100px] h-[40px] bg-accent rounded-lg">Disconnect</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
