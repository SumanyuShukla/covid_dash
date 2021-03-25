import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountUp from "react-countup";

class MainCounter extends Component {

    render() {
        return (
            <>
                <div className="row">
                <div className="col-md-2" style={{color:"#ff110f",backgroundColor:"#ffeaeb",borderRadius:"20px",padding:"1%",margin:"2%"}}>
                        <h4>Total</h4>
                        <h2><CountUp start={0} end={this.props.total} duration={1.5} separator=","/></h2>
                    </div>
                    <div className="col-md-2" style={{color:"#045ed6",backgroundColor:"#d3e6ff",borderRadius:"20px",padding:"1%",margin:"2%"}}>
                        <h4>Active</h4>
                        <h2><CountUp start={0} end={this.props.active} duration={1.5} separator=","/></h2>
                    </div>
                    <div className="col-md-2" style={{color:"#2cbe61",backgroundColor:"#e9fff1",borderRadius:"20px",padding:"1%",margin:"2%"}}>
                        <h4>Recovered</h4>
                        <h2><CountUp start={0} end={this.props.recovered} duration={1.5} separator=","/></h2>
                    </div>
                    <div className="col-md-2" style={{color:"#808080",backgroundColor:"#f2f1f1",borderRadius:"20px",padding:"1%",margin:"2%"}}>
                        <h4>Deaths</h4>
                        <h2><CountUp start={0} end={this.props.deaths} duration={1.5} separator=","/></h2>
                    </div>
                </div>
            </>
        )
    }
}

export default MainCounter;