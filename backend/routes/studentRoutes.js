const express=require("express");
const router=express.Router();
const {createStudent,addSubject,addChapter,updateChapterProgress,getSubjects,
    getChapters,login,signup,getLoggedUser}=require("../controllers/studentController");
const auth=require("../middlewares/auth");
const admin=require("../middlewares/admin");


router.post('/create',createStudent);
router.post('/add-subject',auth,addSubject);
router.post('/add-chapter',auth,addChapter);
router.put('/update-chapter',auth,updateChapterProgress);
router.get('/subjects/:studentId',auth,getSubjects);
router.get("/chapters/:studentId/:subjectId",auth,getChapters);
router.post("/signup",signup);
router.post("/login",login);
router.get("/me",auth,getLoggedUser);


module.exports=router;