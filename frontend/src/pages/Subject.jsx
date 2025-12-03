import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchChapters,updateChapter,addChapter} from "../features/student/studentSlice";
import {motion} from "framer-motion"

function Subject(){
    const {subjectId}=useParams();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.auth);
    const {chapters,loading}=useSelector((state)=>state.student);

    useEffect(()=>{
         if(user?._id){
            dispatch(fetchChapters({studentId:user._id,subjectId}));
         }
    },[user,subjectId]);

    if(loading) return <h2>loading...</h2>;

    return(
        <div style={{padding:"20px"}}>
            <h2>Chapters</h2>
              <button onClick={()=>{
                const title=prompt("Enter Chapter Title");
                if(title){
                    dispatch(addChapter({
                        studentId:user._id,
                        subjectId,
                        chapterTitle:title
                    }));
                }
              }}>+Add chapter</button>
            {
                chapters.map((chap)=>(
                    <motion.div key={chap._id}
                    initial={{opacity:0,x:-20}}
                    animate={{opacity:1,x:0}}
                    trasition={{duration:0.3}}
                    style={{
                        margin:"12px 0",
                        padding:"12px 15px",
                        borderRadius:"10px",
                        background:"#e8ecf0",
                        width:"260px",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        boxShadow:"0 3px 6px rgba(0,0,0,0.06)"
                    }}><span style={{fontSize:"16px",fontWeight:"500"}}>{chap.title}</span>
                     <div style={{dispaly:"flex",alignItems:"center",gap:"8px"}}>
                        <input
                        type="number" min="0" max="100" defaultValue={chap.progress}
                        onBlur={(e)=>{
                            const newProgress=Number(e.target.value);
                            dispatch(updateChapter({
                                studentId:user._id,
                                subjectId,
                                chapterId:chap._id,
                                progress:newProgress
                            }));
                        }} style={{
                            width:"50px",
                            textAlign:"center",
                            padding:"3px",
                            borderRadius:"6px",
                            border:"1px solid #bbb"
                        }}/>
                        <span style={{fontSize:"14px"}}>%</span>
                     </div>
                    </motion.div>
                ))
            }
        </div>
    )

}

export default Subject;