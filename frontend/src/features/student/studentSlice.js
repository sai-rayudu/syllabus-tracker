import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../services/api";
import {toast} from "react-toastify"

export const fetchSubjects=createAsyncThunk(
    "student/fetchSubjetcs",
    async (studentId) =>{
        const data=await apiRequest(`/subjects/${studentId}`,"GET");
        return data

    }
);
export const fetchChapters=createAsyncThunk(
    "student/fetchChapters",
    async ({studentId,subjectId})=>{
        const data=await apiRequest(`/chapters/${studentId}/${subjectId}`,"Get");
        return {subjectId,chapters:data};
    }
);

export const updateChapter=createAsyncThunk(
    "student/updateChapter",
    async ({studentId,subjectId,chapterId,progress})=>{
        await apiRequest("/update-chapter","PUT",{studentId,subjectId,chapterId,progress});
        return {chapterId,progress}
    }
);

export  const addSubject=createAsyncThunk(
    "student/addSubject",
    async ({studentId,subjectName})=>{
        const data=await apiRequest("/add-subject","POST",{
            studentId,
            subjectName
        });
        return data.student.subjects;
    }
);

export const addChapter=createAsyncThunk(
    "student/addChapter",
    async ({studentId,subjectId,chapterTitle})=>{
        const data=await apiRequest("/add-chapter","POST",{studentId,subjectId,chapterTitle});
        return data.student.subjects.find(sub=>sub._id===subjectId).chapters;
    }
);

const studentSlice=createSlice({
    name:"student",
    initialState:{
        subjects:[],
        chapters:[],
        loading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(fetchSubjects.pending,(state)=>{
        state.loading=true;
       })
       .addCase(fetchSubjects.fulfilled,(state,action)=>{
        state.loading=false;
        state.subjects=action.payload;

       })
       .addCase(fetchChapters.pending,(state)=>{
          state.loading=false;
       })
       .addCase(fetchChapters.fulfilled,(state,action)=>{
          state.loading=false;
          state.chapters=action.payload.chapters;
       })
       .addCase(updateChapter.fulfilled,(state,action)=>{
        const {chapterId,progress}=action.payload;
        const chap=state.chapters.find((c)=>c._id===chapterId);
        if(chap){
            chap.progress=progress;
        };
        toast.success("Progress added!");
       })
       .addCase(addSubject.fulfilled,(state,action)=>{
        state.subjects=action.payload;
            toast.success("Subject added!");
       })
       .addCase(addChapter.fulfilled,(state,action)=>{
        state.chapters=action.payload;
        toast.success("Chapter added!");
       });

    },
});

export default studentSlice.reducer;