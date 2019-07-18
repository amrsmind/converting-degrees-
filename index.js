import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


const scaleNames = {
    c:'Celsius',
    f:'Fahrenheit'
};

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }


class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {temperature: ''};
    }
  
    handleChange(e) {
      this.setState({temperature: e.target.value});
    }
  
    render() {
      const temperature = this.state.temperature;
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input name={this.props.name}
                value={this.props.value}
                 onChange={this.props.onChange} />
        </fieldset>
      );
    }
  }

  class Calculator extends React.Component {
      constructor(props){
          super(props);
          this.state = {
             tempC:'',
             tempF:''
          };
          this.handletemp = this.handletemp.bind(this);
      }
      handletemp(e){
            if(e.target.name === "c"){
                 this.setState({
                     tempC:e.target.value,
                     tempF:tryConvert(e.target.value,toFahrenheit)
                 });
                }
                else{
                    this.setState({
                        tempC:tryConvert(e.target.value,toCelsius),
                        tempF:e.target.value
                    });
                   }

                }
            
            
      
    render() {
      return (
        <div>
          <TemperatureInput onChange={this.handletemp} value={this.state.tempC} name="c" scale="c" />
          <TemperatureInput onChange={this.handletemp} value={this.state.tempF} name="f" scale="f" />
        </div>
      );
    }
  }

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
