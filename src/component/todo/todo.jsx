import "./todo.css"
import { useState } from "react"
function Todoapplication (){
const [tasks,settasks] =useState("")
function inputtext(){
    
}
return(
    <>
    <div className="mainbg">
        <div className="todobg">
            <h1>TASKS</h1>
            <div>
                <input type="text" onChange={inputtext} value={tasks}/>
                <button className="addbuton" onClick={btonclick}>+</button>
            </div>
            <ul>

            </ul>
        </div>
    </div>
    </>
)
}
export default Todoapplication
