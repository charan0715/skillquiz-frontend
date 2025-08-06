import "./reg2.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Register2(){
    const [Name,setName] = useState("")
    const [Mobile,setMobile] = useState("")
    const [username,setusername] = useState("")
    const [Password,setPassword] = useState("")
    const [NameError,setNameError] = useState("")
    const [MobileError,setMobileError] = useState("")
    const [PasswordError,setPasswordError] = useState("")
    const navigate=useNavigate()

    const handlereg = async (e)=>{
        e.preventDefault()

        setNameError("")
        setMobileError("")
        setPasswordError("")

        let valid = true 

        if(Name.trim()===""){
            setNameError("Name is required")
            valid= false
        }
        if(!/^\d{10}$/.test(Mobile)){
            setMobileError("Mobile must be 10 digits")
            valid=false
        }
        if(Password.length<6 || !/[0-9]/.test(Password)){
            setPasswordError("Password must be at least 6 characters and include a number")
        }
        if (!valid) return

        try{
            let url = "http://localhost:5000/post"
            let options = {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({Name,Mobile,username,Password})
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if (response.ok){
                setName("")
                setMobile("")
                setPassword("")
                navigate("./login")
            }
            else{
                console.log(data.error,"register failed")
            }
        }
        catch{

        }
    }
    return(
        <>
            <div className="mainbackbg">
                <div className="regbg d-flex flex-column align-items-center">
                    <form onSubmit={handlereg} className="d-flex flex-column">
                        <h1 className="text-center">REGISTERATION</h1>
                        <label className="mt-3">Name</label>
                        <input type="text" value={Name} onChange={(e)=>setName(e.target.value)}/>
                        {NameError && <p className="text-danger">{NameError}</p>}
                        <label className="mt-3">Mobile</label>
                        <input type="number" value={Mobile} onChange={(e)=>setMobile(e.target.value)}/>
                        {MobileError && <p className="text-danger">{MobileError}</p>}
                        <label className="mt-3">username</label>
                        <input type="text" value={username} onChange={(e)=>setusername(e.target.value)}/>
                        <label className="mt-3">Password</label>
                        <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                        {PasswordError && <p className="text-danger">{PasswordError}</p>}
                        <div className="text-center">
                            <button type="submit" className="mt-5 btn btn-primary">REGISTER</button>
                        </div>
                        <p className="text-center">or</p>
                        <div className="text-center">
                            <Link to="/login"><button className="btn btn-primary">LOGIN</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </> 
    )
}
export default Register2