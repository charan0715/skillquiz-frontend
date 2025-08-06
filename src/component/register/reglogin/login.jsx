import "./login.css"
import { useState } from "react";
import Cookies from 'js-cookie';
function Reglog (){
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const[success,setsuccess]=useState('')
    const handlelogin = async(e)=>{
        e.preventDefault()
        try{
            let url="http://localhost:3000/login"
            let options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password
            })}
            const response = await fetch(url,options)
            const data = await response.json()
            console.log(data)
            if (response.ok){
                Cookies.set('token',data.token,{expires:2});

               setsuccess("succesfully login")
            }
            else {
                setsuccess(data.error || "something went wrong")
            }
        }
        catch(err){
            setsuccess("login error"+err.message);
        }
    }
    return(
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <div className="logbg shadow d-flex flex-column justify-content-center align-itens-center">
            <h1 className="text-center">login</h1>
            <form onSubmit={handlelogin} className="d-flex flex-column justify-content-center align-self-center">
                <label>username</label>
                <input type="text" value={username} onChange={(e)=>setusername(e.target.value)}/>
                <label >password</label>
                <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <div className="text-center">
                    <button type="submit" className="mt-3 loginbton btn btn-primary">login</button>
                </div>
                <p>{success}</p>
            </form>    
        </div>
    </div>  
    )  
}
export default Reglog