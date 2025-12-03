const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
const app=express();
const variables=require("dotenv");
const studentRoutes=require("./routes/studentRoutes");
variables.config();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/student",studentRoutes);


app.get('/',(req,res)=>{
    res.json({status:"ok",service:"syllabus-tracker-backend"});
});

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});