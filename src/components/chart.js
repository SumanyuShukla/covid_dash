import React, { Component } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";

class Chart extends Component {


    render() {
        let labels, cases, recovered, deaths, dailycases, dailyrecovered, dailydeaths;
        if (this.props.type == "in" && this.props.stateCode == "tt") {
            labels = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.date) : null;
            cases = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.totalconfirmed) : null;
            recovered = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.totalrecovered) : null;
            deaths = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.totaldeceased) : null;
            dailycases = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.dailyconfirmed) : null;
            dailyrecovered = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.dailyrecovered) : null;
            dailydeaths = (this.props.country.cases_time_series != null) ? this.props.country.cases_time_series.map(data => data.dailydeceased) : null;
        } else if (this.props.type == "in" && this.props.stateCode != "tt") {
            if(this.props.stateData.states_daily != null){
                labels=this.props.stateData.states_daily.map(data => {
                    if(data.status=="Confirmed"){return data.date}
                }).filter(function(x){return x!=undefined;});
                cases=this.props.stateData.states_daily.map(data => {
                    if(data.status=="Confirmed"){return data[this.props.stateCode.toLowerCase()]}
                }).filter(function(x){return x!=undefined;});
                recovered=this.props.stateData.states_daily.map(data => {
                    if(data.status=="Recovered"){return data[this.props.stateCode.toLowerCase()]}
                }).filter(function(x){return x!=undefined;});
                deaths=this.props.stateData.states_daily.map(data => {
                    if(data.status=="Deceased"){return data[this.props.stateCode.toLowerCase()]}
                }).filter(function(x){return x!=undefined;});
            }
        } else {
            labels = (this.props.country.cases != null) ? Object.keys(this.props.country.cases) : null;
            cases = (this.props.country.cases != null) ? Object.values(this.props.country.cases) : null;
            recovered = (this.props.country.recovered != null) ? Object.values(this.props.country.recovered) : null;
            deaths = (this.props.country.deaths != null) ? Object.values(this.props.country.deaths) : null;
        }

        return (
            <div style={{ width: "90%", marginTop: "2%", marginLeft: "5%" }}>
                <Bar data={{
                    labels: this.props.labels,
                    datasets: [{
                        data: this.props.data,
                        backgroundColor: ["#045ed6", "#2cbe61", "#808080"],
                        hoverBackgroundColor: ["cornflowerBlue", "lightGreen", "gray"]
                    }]
                }} options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Current Updates",
                        fontStyle: "bold"
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }} width={500} height={200} />
                {((this.props.type == "in") && (this.props.stateCode == "tt")) ?
                    <div className="row">
                        <div className="col-md-6">
                            <Line data={{
                                labels: labels,
                                datasets: [{
                                    label: "Confirmed",
                                    data: cases,
                                    backgroundColor: "#045ed6",
                                    borderColor: "#045ed6",
                                    fill: false
                                },
                                {
                                    label: "Recovered",
                                    labelColor: "lightGreen",
                                    data: recovered,
                                    backgroundColor: "#2cbe61",
                                    borderColor: "#2cbe61",
                                    fill: false
                                },
                                {
                                    label: "Deaths",
                                    data: deaths,
                                    backgroundColor: "#808080",
                                    borderColor: "#808080",
                                    fill: false
                                }]
                            }} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: false
                                        }
                                    }]
                                }
                            }} width={500} height={400} />
                        </div>
                        <div className="col-md-6">
                            <Line data={{
                                labels: labels,
                                datasets: [{
                                    label: "Confirmed",
                                    data: dailycases,
                                    backgroundColor: "#045ed6",
                                    borderColor: "#045ed6",
                                    fill: false
                                },
                                {
                                    label: "Recovered",
                                    labelColor: "lightGreen",
                                    data: dailyrecovered,
                                    backgroundColor: "#2cbe61",
                                    borderColor: "#2cbe61",
                                    fill: false
                                },
                                {
                                    label: "Deaths",
                                    data: dailydeaths,
                                    backgroundColor: "#808080",
                                    borderColor: "#808080",
                                    fill: false
                                }]
                            }} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: false
                                        }
                                    }]
                                }
                            }} width={500} height={400} />
                        </div>
                    </div> :
                    ((this.props.type == "in") && (this.props.stateCode != "tt")) ?
                    <Line data={{
                        labels: labels,
                        datasets: [{
                            label: "Confirmed",
                            data: cases,
                            backgroundColor: "#045ed6",
                            borderColor: "#045ed6",
                            fill: false
                        },
                        {
                            label: "Recovered",
                            labelColor: "lightGreen",
                            data: recovered,
                            backgroundColor: "#2cbe61",
                            borderColor: "#2cbe61",
                            fill: false
                        },
                        {
                            label: "Deaths",
                            data: deaths,
                            backgroundColor: "#808080",
                            borderColor: "#808080",
                            fill: false
                        }]
                    }} options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        }
                    }} width={500} height={200} /> :

                        <Line data={{
                            labels: labels,
                            datasets: [{
                                label: "Confirmed",
                                data: cases,
                                backgroundColor: "#045ed6",
                                borderColor: "#045ed6",
                                fill: false
                            },
                            {
                                label: "Recovered",
                                labelColor: "lightGreen",
                                data: recovered,
                                backgroundColor: "#2cbe61",
                                borderColor: "#2cbe61",
                                fill: false
                            },
                            {
                                label: "Deaths",
                                data: deaths,
                                backgroundColor: "#808080",
                                borderColor: "#808080",
                                fill: false
                            }]
                        }} options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            }
                        }} width={500} height={200} />

                }
            </div>
        )
    }
}

export default Chart;