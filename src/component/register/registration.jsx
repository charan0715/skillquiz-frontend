import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./registration.css"

function Register (){
    const [name,setname]=useState("")
    const [mobile,setmobile]=useState("")
    const [email,setemail]=useState("")
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
    const handlesignup=async(e)=>{
        e.preventDefault()
        try{
           let url="http://localhost:3000/post"
           let options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,mobile:mobile,email,username,password
            })
           }
           const response = await fetch(url,options)
           const data = await response.json()
           if(response.ok){
            console.log(data)
            setname("")
            setmobile("")
            setemail("")
            setusername("")
            setpassword("")
            navigate("./login")
           }
           else{
            console.log(data.error,"signup failed")
           }
        }
        
        catch{
            // seterror("not triggering")
        }
    }
return(
    
    <div className="d-flex flex-column justify-content-center align-items-center">            

        <div className="regmainbg shadow">
            <form onClick={handlesignup} className="regform">
                <h1 className="userhead">USER REGISTRATION</h1>
                <label>Name</label>
                <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="inputbox"/>
                <label>mobile number</label>
                <input type="number" value={mobile} onChange={(e)=>setmobile(e.target.value)} className="inputbox"/>
                <label>email</label>
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className="inputbox"/>
                <label>username</label>
                <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} className="inputbox"/>
                <label>password</label>
                <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)} className="inputbox"/>
                <div className="text-center">
                    <button type="submit"className="signbton btn btn-primary">signup</button>
                </div>
                <div className="text-center mt-4">
                    <Link to="/login">Login</Link>
                </div>
                
            </form>
        </div>
    </div>
)
}
export default Register