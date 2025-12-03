const mongoose=require("mongoose");
const chapterSchema= new mongoose.Schema({
    title:String,
    progress:{type:Number,default:0}
});

const subjectSchema= new mongoose.Schema({
    name:String,
    chapters:[chapterSchema]

});

const studentSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String,default:"user"},
    subjects:[subjectSchema]
},{
    timestamps:true
});

module.exports=mongoose.model("Student",studentSchema);