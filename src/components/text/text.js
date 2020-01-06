import React , {Component} from "react"
import "./text.css"

class Text extends Component {
    render(){
        return(
            <div className={"container text-div"}>
                <input className={"text"} maxLength={"25"}></input>
            </div> 
        )
    }
}

export default Text