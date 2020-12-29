import React, { Component } from "react";
import Chart from "react-apexcharts";

// fake data 
let stockPrice = [15,16,17,18,19,20,21,22,23,24,25,26,27]
let breakeven = 22
let premium = -200
let gainsArr = stockPrice.map(x => profitCalculator(x))
let longCallStrike = 20

// function to calculate profit/loss
function profitCalculator(x) {
  if ((x - breakeven) * 100 < premium) {
    return premium
  } 
  else {
    let gain = (x - breakeven) * 100
    return gain
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "gains-chart",
          type: 'line'
        },
        annotations: { 
          // y-axis annotations 
          yaxis: [
            // y-axis line for zero
            {
              y: 0,
              strokeDashArray: 0,
              borderColor: 'red',
              label: {
                borderColor: 'red',
                style: {
                  color: '#fff',
                  background: 'red',
                },
              }
            }
          ], // end of y-axis annotations
          // x-axis annotations
          xaxis: [
            // x-axis line for breakeven
            {
              x: breakeven,
              borderColor: 'green',
              label: {
                borderColor: 'green',
                style: {
                  color: '#fff',
                  background: 'green',
                },
                text: 'Breakeven Price',
              }
            }, // end
            // x-axis line for strike price
            {
              x: longCallStrike,
              borderColor: 'black',
              label: {
                borderColor: 'black',
                style: {
                  color: '#fff',
                  background: 'black',
                },
                text: 'Long Call Strike',
              }
            }
          ] // end x-axis
        }, // end of annotations
        // line gradient 
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ 'red', 'green'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
              {
                offset: 0,
                color: "red",
                opacity: 1
              },
              {
                offset: 100,
                color: "green",
                opacity: 1
              }
            ]
          },
        }, // end 
        // x-axis meta
        xaxis: {
          categories: stockPrice,
          title: {
            text: 'Stock Price'
          }
        },
        // y-axis meta
        yaxis: {
          title: {
            text: 'Profit / Loss'
          }
        }
      },
      // y-axis data
      series: [
        {
          name: "Gain",
          data: gainsArr
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="800"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

