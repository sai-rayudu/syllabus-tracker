import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}){
    const {isLoggedIn,authLoading} =useSelector((state)=>state.auth);


    if(authLoading){
         return <h2>Loading...</h2>; 

    }
    if(!isLoggedIn){
        return <Navigate to="/"/>;

    }
    return children;

}

export default ProtectedRoute;