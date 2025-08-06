import { Component } from "react";
import "./countercs.css"
class Counter extends Component{
    state={
        count:0 
    }
    decrease=()=>{
        this.setState(prevState => {
      if (prevState.count === 0) return null;   
      return { count: prevState.count - 1 };
    });
       
    }
    increase=()=>{
        this.setState(nxt=>({
            count:nxt.count+1
        }))
    }
    reset=()=>{
        this.setState(rst=>({
            count:0
        }))
    }
    render(){
        const {count}=this.state
        return(
            <>
            <div className="mainbg">
                <h1 className="counterhead">counter</h1>
                <div className="innerbg">
                    <p>{count}</p>
                    <button className="fx" onClick={this.decrease}>decrease</button>
                    <button className="fx" onClick={this.reset}>reset</button>
                    <button className="fx" onClick={this.increase}>increase</button>                    
                </div>
            </div>
            </>
        )
    }
}
export default Counter