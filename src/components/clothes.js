import React from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

class Clothes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        totalsData: [],
        labels: ["Jumper", "Hoodie", "Jacket", "Sweater", "Blazer", "Raincoat"]
    };
  }

  componentDidMount() {
    this.getClothesTotals();
  }

  getClothesTotals() {
    let array = []  
    let jumper = 0
    let hoodie = 0
    let jacket = 0
    let sweater = 0
    let blazer = 0
    let raincoat = 0
    axios.get(`https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil`)
    .then((response) => {
        jumper = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'jumper');
        }, 0);
        hoodie = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'hoodie');
        }, 0);
        jacket = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'jacket');
        }, 0);
        sweater = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'sweater');
        }, 0);
        blazer = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'blazer');
        }, 0);
        raincoat = response.data.payload.reduce(function (n, item) {
            return n + (item.clothe === 'raincoat');
        }, 0);
        array.push({
            data: [jumper, hoodie, jacket, sweater, blazer, raincoat],
            backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
        })
        this.setState({totalsData: array});
    })
  }

  render() {
    let pie
    if (this.state.totalsData) {
        pie = <Pie 
        data={{
            labels: this.state.labels,
            datasets: this.state.totalsData
        }}
        options={{
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 10
                }
            },
          }}
        height='100%'
        />
    }
    return (
    <React.Fragment>
        {pie}
    </React.Fragment>
    );
  }
}

export default Clothes;