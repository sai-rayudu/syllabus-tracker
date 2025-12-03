const BASE_URL="http://localhost:5000/api/student";

export async function apiRequest(endpoint,method="GET",body){
    const token=localStorage.getItem("token");
     console.log("making requset");
    const headers={
        "Content-Type":"application/json"
    };
    if(token){
        headers["Authorization"]=`Bearer ${token}`;
    }
    const options={
        method,
        headers
    };
    if(body){
        options.body=JSON.stringify(body);
    }
    const response=await fetch(`${BASE_URL}${endpoint}`,options);
    const data =await response.json();
    console.log(data)
    return data;
}