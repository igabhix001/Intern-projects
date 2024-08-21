import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
export default function Signup() {
    const[firstName,setfirstName]=useState("");
    const[lastName,setlastName]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate()
    return (
        <div className="  ">
            <div className=" max-h-screen border-2 shadow-xl mx-auto m-14 w-min rounded-lg">
                <div className=" bg-white h-min py-4 w-96 justify-center items-center   ">

                    <div className="SignupHeading py-4 ">
                        <h1 className="flex justify-center text-3xl  font-extrabold">Sign Up</h1>
                        <h5 className="  px-14 py-4 justify-center  font-semibold text-gray-400">Enter your information to create an &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;    &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   account </h5>
                    </div>

                    <div className="inputBoxes px-4 mx-4 text-md font-semibold ">
                       
                        <div className="  ">
                             <p className="py-2">First Name</p>
                            <input onChange={(e)=>{
                                setfirstName(e.target.value)
                            }} type="text" placeholder="  Joe" className="border-2 w-80  p-2 rounded-md " />
                        </div>
                        <div  className=" "> 
                            <p className="py-2">Last Name</p>
                            <input onChange={(e)=>{
                                setlastName(e.target.value)
                            }} type="text" placeholder="  Doe" className="border-2 py-2 w-80 rounded-md " />
                        </div>
                        <div  className=""> 
                             <p className="py-2">Email</p>
                            <input onChange={(e)=>{
                                setUsername(e.target.value)
                            }} type="text" placeholder="  Joedoe@gmail.com" className="py-2 w-80 rounded-md border-2" />
                        </div>
                        <div  className=""> 
                             <p className="py-2">Password</p>
                            <input onChange={(e)=>{
                                setPassword(e.target.value)
                            }} type="text" placeholder="" className="py-2 w-80 rounded-md border-2" />

                        </div>
                    </div>
                    <button onClick={ async()=>{
                       const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            firstName,
                            lastName,
                            username,
                            password
                        });
                          
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard")
                    }} className=" border-2 text-md font-semibold  p-2 w-80 mx-8 my-4 rounded-md bg-black text-slate-200 ">Sign Up</button>

                    

                    <div className=" flex justify-center text-sm font-semibold ">
                        <span >Already have an account?&nbsp;</span>
                        <Link to='/signin'><span className="underline" >Sign In</span></Link>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}