import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchSubjects,addSubject} from "../features/student/studentSlice";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/auth/authSlice";
import Test from "./text"
import {motion} from "framer-motion";


function Dashboard(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.auth);
    const {subjects,loading} =useSelector((state)=>state.student);

    useEffect(()=>{
        console.log("sai");
        if(user?._id){
            dispatch(fetchSubjects(user._id));
        }
    },[user]);

    if(loading) return <h2>loading....</h2>;

    return(
       <div style={{padding:"20px"}}>

        <h1>Dashboard</h1>
        <button onClick={()=>{
            dispatch(logout());
            navigate("/");
        }}
        style={{
            marginBottom:"20px",
            padding:"8px 14px",
            borderRadius:"6px",
            background:"#ff4d4f",
            color:"white",
            border:"none",
            cursor:"pointer"
        }}>Logout</button>
        <button onClick={()=>{
            const name=prompt("Enter Subject Name");
            if(name){
                dispatch(addSubject({studentId:user._id,subjectName:name}));
            }
        }}>+Add Subject</button>
        {subjects.map((sub)=>(
            <motion.div key={sub._id}
            onClick={()=>navigate(`/subject/${sub._id}`)}
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.3}}
            style={{
                margin:"10px 0",
                padding:"12px 15px",
                borderRadius:"10px",
                background:"#f3f3f3",
                width:"220px",
                cursor:"pointer",
            boxShadow:"0 3px 6px rgba(0,0,0,0.1)"}}>
              
                
                
                <b style={{ontSize:"18px"}}>{sub.name}</b>
                <div style={{fontSize:"14px",marginTop:"5px",color:"#444"}}>
                    { console.log(sub.chapters.length)}
                    {
                     
                        (sub.chapters.length>0) ?
                        Math.round(
                            sub.chapters.reduce((sum,c)=>sum+c.progress,0)/sub.chapters.length
                        ):0
                    }% completed
                </div>

               
            </motion.div>))}

         <Test/>

       </div>
    )
}

export default Dashboard;