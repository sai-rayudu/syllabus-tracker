import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Subject from "./pages/Subject.jsx";
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {setCredentials} from "./features/auth/authSlice";
import {apiRequest} from "./services/api";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App(){

  const dispatch=useDispatch();
  const {isLoggedIn}=useSelector((state)=>state.auth);
  useEffect(()=>{
    async function restoreUser(){
      const token=localStorage.getItem("token");
      if(!token){
        dispatch(setCredentials({ user: null, token: null }));
      return;
      }
        const data=await apiRequest("/me","GET");
          dispatch(setCredentials({user:data,token}));
        
      
    }
    restoreUser();
  },[]);
  return(
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/subject/:subjectId" element={<ProtectedRoute><Subject/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;
