const Student=require("../models/Student");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const createStudent=async (req,res)=>{
    try{
        const {name,email}=req.body;
        const student =await Student.create({name,email});
        res.status(201).json({
         message:"Student created",
         student
        });
    }
    catch(err){
        res.status(500).json({error:"server error"});
    }
};

const addSubject=async (req,res)=>{
try{
    const {studentId,subjectName}=req.body;
    const student=await Student.findByIdAndUpdate(
        studentId,
        {
            $push:{
                subjects:{name:subjectName,chapters:[]}
            }
        },
        {new:true}
    );
    res.status(200).json({
        message:"subject added",
        student
    });
}
catch(err){
  res.status(500).json({error:"server error"});
}
}

const addChapter=async (req,res)=>{
    try{
        const {studentId,subjectId,chapterTitle}=req.body;

        const student=await Student.findOneAndUpdate(
            {_id:studentId,"subjects._id":subjectId},
            {
            $push :{
                  "subjects.$.chapters":{title:chapterTitle,progress:0}
            }
            },
            {
              new:true
            }
            
        );
        res.status(200).json({
            message:"chapter added",
            student
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server error"});
    }
};

const updateChapterProgress=async (req,res)=>{
    try{
        const {studentId,subjectId,chapterId,progress}=req.body;

        const student=await Student.findOneAndUpdate(
          {
            _id:studentId,
            "subjects._id":subjectId,
            "subjects.chapters._id":chapterId
          },
          {
            $set:{
                "subjects.$[sub].chapters.$[chap].progress":progress
            }
          },
          {
            new:true,
            arrayFilters:[
                {"sub._id":subjectId},
                {"chap._id":chapterId}
            ]
          }
        );
        res.status(200).json({
            message:"chapter progress updated",
            student

        });

    }
    catch(err){
      res.status(500).json({error:"server error"});
    }
};
const getSubjects=async (req,res)=>{
    try{
        const{studentId}=req.params;
        const student=await Student.findById(studentId);

        if(!student){
            return res.status(404).json({error:"student not found"})
        }
        res.status(200).json(student.subjects)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server error"});
    }
};
const getChapters=async (req,res)=>{
    try{
        const {studentId,subjectId}=req.params;
        const student=await Student.findById(studentId);
        if(!student){
            return res.status(404).json()
        }
        const subject=student.subjects.id(subjectId);
        if(!subject){
            return res.status(404).json({error:"Subject not found"});
        }
        res.status(200).json(subject.chapters);
    } catch(err){
        res.status(500).json({error:"server error"});
    }
};
const signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        const exists=await Student.findOne({email});
        if(exists){
            return res.status(400).json({error:"email already exists"});
        };
        const hashed=await bcrypt.hash(password,10);
        const user=await Student.create({
            name,
            email,
            password:hashed,
            role:role || "user"
        });
        res.status(201).json({
           message:"signup successful",
           user
        });
    }
    catch(err){
        res.status(500).json({error:"server error"});
    }
};

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await Student.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const token=jwt.sign(
            {id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}
        );
        res.status(200).json({
            message:"Login successful",
            token,
            user
        })
    }
    catch(err){
        res.status(500).json({error:"server error"});
    }
};
  const getLoggedUser=async (req,res)=>{
    try {
        const user=await Student.findById(req.user.id).select("-password");
        res.status(200).json(user);
 }
 catch(err){
    res.status(500).json({error:"server error"});
 }
  };
module.exports={createStudent,addSubject,addChapter,updateChapterProgress,getSubjects,
    getChapters,signup,login,getLoggedUser

};