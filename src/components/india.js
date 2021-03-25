import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SidePanel from "./sidePanel";
import MainCounter from "./mainCounter";
import CountryList from "./countryList";
import Chart from "./chart";
import "./home.css";
import DailyUpdates from "./DailyUpdates";
import { fetchUpdates } from "./data";
import { BrowserRouter as Link, Redirect, BrowserRouter, Router } from "react-router-dom";

class India extends Component {

    constructor() {
        super();
        this.state = {
            total: 0,
            active: 0,
            recovered: 0,
            deaths: 0,
            country: Object,
            dailyData: Object,
            stateCode: "",
            stateData: ""
        }
    }

    fetchHistoricalData = (country) => {
        return new Promise((resolve, reject) => axios.get("https://corona.lmao.ninja/v2/historical/" + country + "?lastdays=30").then(response => {
            if (country == "all") {
                resolve(response.data);
            } else {
                resolve(response.data.timeline);
            }
        }));
    }

    fetchStateData = () => {
        return new Promise((resolve, reject) => axios.get("https://api.covid19india.org/states_daily.json").then(response => {
            resolve(response.data);
        }));
    }

    callback = (data) => {
        if (this.state.stateData == "") {
            this.fetchStateData().then(response => {
                this.setState({
                    stateData: response
                })
            });
        }
        this.setState({
            dailyData: data,
            total: parseInt(data.confirmed),
            active: parseInt(data.active),
            recovered: parseInt(data.recovered),
            deaths: parseInt(data.deaths),
            stateCode: data.statecode.toLowerCase()
        });
    }


    componentDidMount() {
        fetchUpdates().then(data => {
            this.setState({
                total: parseInt(data.statewise[0].confirmed),
                active: parseInt(data.statewise[0].active),
                recovered: parseInt(data.statewise[0].recovered),
                deaths: parseInt(data.statewise[0].deaths),
                country: data,
                dailyData: data.statewise[0],
                stateCode: data.statewise[0].statecode.toLowerCase()
            });
        });

    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <SidePanel />
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>Covid Updates</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {(this.state.total != 0) ?
                                        <MainCounter total={this.state.total} active={this.state.active} deaths={this.state.deaths} recovered={this.state.recovered} /> :
                                        <div>Loading...</div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <CountryList callback={this.callback} type="in" list={this.state.country} />
                                </div>
                                <div className="col-md-8">
                                    {
                                        (this.state.country !== null) ?
                                            <Chart labels={["Active", "Recovered", "Deaths"]} data={[this.state.active, this.state.recovered, this.state.deaths]} country={this.state.country} stateCode={this.state.stateCode} stateData={this.state.stateData} type="in" /> :
                                            <div>Loading...</div>
                                    }
                                </div>
                                <div className="col-md-2">
                                    <DailyUpdates data={this.state.dailyData} type="in" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <button onClick={()=>this.props.history.push("/global")}>World Updates</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default India;