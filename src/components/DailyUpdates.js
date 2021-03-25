import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class DailyUpdates extends Component {

    timeDifference = (time) => {
        let currentTime = new Date().getTime();
        let timeDiff = currentTime - time;
        let seconds = (timeDiff / 1000).toFixed(0);
        let minutes = (timeDiff / (1000 * 60)).toFixed(0);
        let hours = (timeDiff / (1000 * 60 * 60)).toFixed(0);
        let days = (timeDiff / (1000 * 60 * 60 * 24)).toFixed(0);

        if (seconds < 60) {
            return seconds + " Seconds";
        } else if (minutes < 60) {
            return minutes + " Minutes";
        } else if (hours < 24) {
            return hours + " Hours";
        } else {
            return days + " Days"
        }
    }

    render() {
        if (this.props.type == "in") {
            return (
                <div style={{ border: "none", borderRadius: "20px", backgroundColor: "#ede4ff", marginTop: "10%", color: "#604d86" }}>
                    <div className="row">
                        <div className="col-md-12" align="center" style={{ marginTop: "2%", color: "#332352" }}>
                            <h2>{this.props.data.state}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>*Last Updated {this.props.data.lastupdatedtime}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#ff110f", fontStyle: "bold", marginLeft: "10%" }}>New Cases </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#ff110f", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.deltaconfirmed}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#808080", fontStyle: "bold", marginLeft: "10%" }}>New Deaths </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#808080", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.deltadeaths}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#2cbe61", fontStyle: "bold", marginLeft: "10%" }}>Recovered </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#2cbe61", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.deltarecovered}</p>
                        </div>
                    </div>
                </div>
            )

        } else {
            return (
                <div style={{ border: "none", borderRadius: "20px", backgroundColor: "#ede4ff", marginTop: "10%", color: "#604d86" }}>
                    <div className="row">
                        <div className="col-md-12" align="center" style={{ marginTop: "2%", color: "#332352" }}>
                            {(this.props.data.country) ?
                                <h2>{this.props.data.country}</h2> :
                                <h2>Global</h2>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>*Updated {this.timeDifference(this.props.data.updated)} ago</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#ff110f", fontStyle: "bold", marginLeft: "10%" }}>New Cases </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#ff110f", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.todayCases}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#808080", fontStyle: "bold", marginLeft: "10%" }}>New Deaths </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#808080", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.todayDeaths}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "10%" }}>Critical </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.critical}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "10%" }}>Tests </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.tests}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "10%" }}>Cases Per Million </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.casesPerOneMillion}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "10%" }}>Deaths Per Million </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.deathsPerOneMillion}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "10%" }}>Tests Per Million </p>
                        </div>
                        <div className="col-md-6">
                            <p style={{ color: "#332352", fontStyle: "bold", marginLeft: "2%" }}>{this.props.data.testsPerOneMillion}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default DailyUpdates;