import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../features/auth/authSlice";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isLoggedIn}=useSelector((state)=>state.auth);
    useEffect(()=>{
      console.log("use effect in login")
      if(isLoggedIn){
         navigate("/dashboard");
      }
    },[isLoggedIn])
  
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

     const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password}))
        .unwrap()
        .then((res)=>{
         if(res.error){
            toast.error(res.error);
         }
         else{
            toast.success("Login Successful");
         }
        })
        .catch(()=>toast.error("Login failed"));
     };
     return(
        <div style={{padding:"40px"}}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",width:"200px"}}>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input placeholder="password" type="password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
        </div>
     )
}
export default Login;