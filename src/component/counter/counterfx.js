import { useState } from "react"
function Counterf(){
    const [count,setcount]=useState("0")
    return(
        <>
          <div className="mainbg">
                <h1 className="counterhead">counter</h1>
                <div className="innerbg">
                    <p>{count}</p>
                    <button className="fx" onClick={()=>{setcount(c=>c > 0 ? c-1 :c)}}>decrease</button>
                    <button className="fx" onClick={()=>{setcount(0)}}>reset</button>
                    <button className="fx" onClick={()=>{setcount(c=>c+1)}}>increase</button>                    
                </div>
            </div>
        </>
    )
}
export default Counterf