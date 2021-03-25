import React,{Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

class SidePanel extends Component{
    render(){
        return(
            <>
            <div className="container-fluid" style={{border:'1px solid black'}}>
                <p>This is side panel</p>
                <FontAwesomeIcon icon={faAddressBook}/>
            </div>
            </>
        )
    }
}

export default SidePanel;