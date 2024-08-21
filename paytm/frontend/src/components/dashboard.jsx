import { useEffect, useState } from "react"
import axios from "axios"
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom"



export default function Dashboard() {

    const [user, setUser] = useState([]);
    const [filter, setFilter] = useState("")
    const[balance,setBalance]=useState("")
   
    useEffect(() => {
      const delayedFilter = debounce(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((response) => {
          setUser(response.data.user);
        });
      }, 500);
      
      delayedFilter();
      
      return () => {
        delayedFilter.cancel();
      };
    }, [filter]);
    

    useEffect(() => {
      const fetchBalance = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: { authorization: "Bearer " + localStorage.getItem("token") }
        });
        setBalance(response.data.balance);
      };
      fetchBalance();
    }, [])
    
    

    return (

        <div className="py-14  ">
            <div className="flex justify-between p-2 px-16  border-2 ">
                <h1 className="font-bold text-2xl">Payments App</h1>
                <div className="font-semibold  ">
                    <span className="p-1  ">Hello,</span>
                    <span className="rounded-full bg-gray-200 font-bold p-2 px-3">U</span>
                </div>
            </div>
            <div className="font-bold text-xl px-16">
                <p className="py-8  ">Your Balance &nbsp; ${(Number(balance)).toFixed(2)} </p>
                <p className="py-4">Users</p>
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="text" placeholder=" Search Users..." className="border-2 p-1.5 font-semibold w-full text-lg rounded p" />

            </div>

            <div>
                {user.map((user, index) => <User user={user} key={user._id} />)}
            </div>

        </div>
    )


}
function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="userList py-2 px-16  ">
            <ul>
                <li className="flex justify-between py-2">
                    <div className="flex gap-6 items-center">
                        <span className="rounded-full bg-gray-300 font-semibold p-2 px-3">{user.firstName[0]}</span>
                        <span className="text-lg font-bold">{user.firstName} {user.lastName}</span>
                    </div>
                    <button onClick={()=>{
                        navigate("/send?id=" + user._id + "&name=" + user.firstName)
                    }} className="font-semibold bg-black text-white text-sm p-2 rounded-md px-4">Send Money</button>

                </li>

            </ul>
        </div>
    )
}