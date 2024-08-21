import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate =useNavigate();
    return (
        <div className="bg-black h-screen py-32 ">
            <div className="bg-black max-h-screen  border border-gray-400 mx-auto  w-min rounded-sm">
                <div className=" bg-black h-min py-4 w-80 justify-center items-center   ">
                    <h1 className="flex justify-center text-3xl text-green-600 font-extrabold">Sign In</h1>
                    <p className="  px-6 py-4  justify-center font-semibold text-green-600">Enter your credentials to access your &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; account</p>
                    <div className=" font-semibold px-4">
                        <p className="inputBoxes text-slate-200 px-4 py- lg text-md font-semibold ">Email</p>
                        <input onChange={(e) => {
                            setUsername(e.target.value)
                        }} type="text" placeholder=" johndoe@gmail.com" className=" bg-zinc-800 text-white w-60 m-4  p-1.5 rounded-md" />
                        <p className="inputBoxes px-4 py- lg text-md text-slate-200 font-semibold ">Password</p>
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="text" className=" bg-zinc-800 text-white m-4 w-60  p-1.5 rounded-md" />
                        <button onClick={async()=>{
                          const response = await  axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            })

                            localStorage.setItem("token",response.data.token)
                            setTimeout(()=>{
                                navigate("/dashboard");

                            },1000)
                        }} className=" border border-gray-500 text-md font-semibold py-2 m-4 w-60  rounded-md bg-black text-slate-200 ">Sign In</button>

                    </div>
                    <div className=" flex text-gray-400 px-10 text-sm font-semibold">
                        <span>Do not have account? </span>
                        <Link to='/signup'><span className="underline px-2">Sign Up</span></Link>

                    </div>
                </div>
            </div>
        </div>
    )
}