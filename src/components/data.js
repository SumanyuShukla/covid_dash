import React, { Component } from "react";
import axios from "axios";

export let list=[];

// export class DataAPI extends Component {

    // constructor(){
    //     this.list=[];
    // }

   export const fetchUpdates = () => {
        return new Promise((resolve, reject) => (axios.get("https://api.covid19india.org/data.json").then(response => {
            resolve(response.data);
        })))
    }
// }

// export default DataAPI;
