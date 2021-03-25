import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { fetchUpdates } from "./data";

class CountryList extends Component {

    constructor() {
        super();
        this.state = {
            countryList: []
        }
    }

    oldIndex = "";
    sendObj = (obj, index) => {
        this.props.callback(obj);
        if (this.oldIndex !== "") {
            if (document.getElementById(this.oldIndex)) {
                document.getElementById(this.oldIndex).style.backgroundColor = "transparent";
            }
        }
        document.getElementById(index).style.backgroundColor = "#9f4ca085";
        this.oldIndex = index;
    }

    fetchCountryList = () => {
        return new Promise((resolve, reject) => (axios.get("https://corona.lmao.ninja/v2/countries").then(response => {
            resolve(response);
        })))
    }

    sortArray(array, key) {
        if (this.props.type == "in") {
            var a = [];
            for (var i of array) {
                a.push(i);
            }
            return a;
        } else {
            return array.sort(function (a, b) {
                return ((a[key] > b[key]) ? -1 : (a[key] < b[key]) ? 1 : 0);
            })
        }
    }

    searchArray = [];

    search = (e) => {
        this.searchArray = [];
        if (e.target.value != "") {
            for (let c of this.countryArray) {
                if (this.props.type == "in") {
                    if (c.state.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                        this.searchArray.push(c);
                    }
                } else {
                    if (c.country.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                        this.searchArray.push(c);
                    }
                }
            }
            this.setState({
                countryList: this.searchArray
            })
        } else {
            document.getElementById(this.oldIndex).style.backgroundColor = "transparent";
            this.setState({
                countryList: this.countryArray
            })
        }
    }

    countryArray = [];

    componentDidMount() {
        if (this.props.type == "in") {
            fetchUpdates().then(data => {
                this.countryArray = this.sortArray(data.statewise, "active");
                this.setState({
                    countryList: this.sortArray(data.statewise, "active")
                });
            })
        } else {
            this.fetchCountryList().then(list => {
                this.countryArray = this.sortArray(list.data, "active");
                this.setState({
                    countryList: this.sortArray(list.data, "active")
                });
            })
        }
    }


    render() {
        let listName;
        if (this.props.type == "in") {
            listName = this.state.countryList.map((l, index) =>
                <div className="row" key={index} id={index} style={{ color: "#604d86" }} onClick={() => this.sendObj(l, index)}>
                    <div className="col-md-4" >{l.state}</div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4" float="left">{l.active}</div></div>
            );
        } else {
            listName = this.state.countryList.map((l, index) =>
                <div className="row" key={index} id={index} style={{ color: "#604d86" }} onClick={() => this.sendObj(l, index)}>
                    <div className="col-md-4" >{l.country}</div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4" float="left">{l.active}</div></div>
            );
        }
        return (
            <div style={{ border: "none", borderRadius: "20px", backgroundColor: "#ede4ff", marginTop: "10%" }}>
                <div className="row">
                    <div className="col-md-12">
                        {(this.props.type == "in") ?
                            <input type="text" placeholder="Search State" onChange={this.search} style={{ borderRadius: "20px", marginTop: "6%", marginLeft: "8%", padding: "2%", outline: "none", border: "none" }} /> :
                            <input type="text" placeholder="Search Country" onChange={this.search} style={{ borderRadius: "20px", marginTop: "6%", marginLeft: "8%", padding: "2%", outline: "none", border: "none" }} />
                        }
                    </div>
                </div>
                <div className="row" style={{ height: "650px", overflow: "scroll", margin: "6%", padding: "2%" }}>
                    <div className="col-md-12">
                        {listName}
                    </div>
                </div>
            </div>
        )
    }
}

export default CountryList;