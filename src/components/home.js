import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SidePanel from "./sidePanel";
import MainCounter from "./mainCounter";
import CountryList from "./countryList";
import Chart from "./chart";
import "./home.css";
import DailyUpdates from "./DailyUpdates";
import {BrowserRouter as Link} from "react-router-dom";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            total: 0,
            active: 0,
            recovered: 0,
            deaths: 0,
            country: Object,
            dailyData: Object
        }
    }


    fetchUpdates = () => {
        return new Promise((resolve, reject) => (axios.get("https://corona.lmao.ninja/v2/all").then(response => {
            resolve(response.data);
        })))
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

    fetchCountryData = (country) => {
        if (country != "all") {
            return new Promise((resolve, reject) => axios.get("https://corona.lmao.ninja/v2/countries/" + country).then(response => {
                resolve(response.data);
            }));
        }
    }

    callback = (data) => {
        this.fetchHistoricalData(data.country).then(r => {
            this.setState({
                country: r
            });
        });
        this.fetchCountryData(data.country).then(r => {
            this.setState({
                dailyData: r,
                total: r.cases,
                active: r.active,
                recovered: r.recovered,
                deaths: r.deaths
            });
        });
    }

    componentDidMount() {
        this.fetchHistoricalData("all").then(r => {
            this.setState({
                country: r
            });
        });
        this.fetchUpdates().then(data => {
            this.setState({
                total: data.cases,
                active: data.active,
                recovered: data.recovered,
                deaths: data.deaths,
                dailyData: data
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
                                    <CountryList callback={this.callback} type="all"/>
                                </div>
                                <div className="col-md-8">
                                    {
                                        (this.state.country !== null) ?
                                            <Chart labels={["Active", "Recovered", "Deaths"]} data={[this.state.active, this.state.recovered, this.state.deaths]} country={this.state.country} type="all"/> :
                                            <div>Loading...</div>
                                    }
                                </div>
                                <div className="col-md-2">
                                    <DailyUpdates data={this.state.dailyData} type="all"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                        <button onClick={()=>this.props.history.push("/")}>India Updates</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;