import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Send(){
    const [amount,setAmount]=useState("");
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id")
    const name=searchParams.get("name")
    const[transferSuccess,setTransferSuccess] = useState(false);
    return(
        <div className=" h-screen py-32 ">
        <div className=" max-h-screen  border shadow-2xl mx-auto py-10 w-96 rounded-sm">
                <div className="  h-min py-4 w-80 justify-center items-center   ">
                <h1 className="flex justify-center text-3xl  font-extrabold">Send Money</h1>
                <div className=" font-semibold px-8  py-8">
                    <div className="flex items-center">
                    <span className="bg-green-400 rounded-full px-4 text-2xl  py-2 ">{name[0].toUpperCase()}</span>

                    <span className="inputBoxes  px-4  text-2xl font-bold ">{name}</span>
                    </div>
                    <p className="inputBoxes px-4 pt-2  font-semibold ">Amount (in Rs)</p>
                    
                    <input onChange={(e)=>{
                        setAmount(e.target.value)
                    }} type="number" placeholder=" Enter amount" className=" border  w-full mx-4 my-2  p-1.5 rounded-md"/>
                    <button onClick={async()=>{
                    await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount
                    },{headers:{Authorization: "Bearer " + localStorage.getItem("token")}})
                    setTransferSuccess(true)
                    }} className=" border border-gray-500 text-md font-semibold py-2 m-4 w-full  rounded-md bg-green-500 text-slate-200 ">Initiate Transfer</button>
                    

                    {transferSuccess && (
                        <div className=" flex justify-center mt-4 text-green-500 font-bold">
                            Transfer Successful
                        </div>
                    )}

                </div>
                
            </div>
        </div>
        </div>
    )
}