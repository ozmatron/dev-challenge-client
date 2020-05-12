import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import clouds from './Clouds.png';

class WeatherPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        // lat: 51.4939446,
        // lon: -0.0841836,
        lat: null,
        lon: null,
        temp: null,
        weather: null,
        locationName: null
    };
  }

  componentDidMount() {
    var lat = null
    var lon = null
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {       
            if (position.coords.latitude && position.coords.longitude) {
                lat = position.coords.latitude;
                lon = position.coords.longitude
                this.setState({lat: lat}) 
                this.setState({lon: lon});
            }
          });
    }
  }

  getWeather() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=d0a10211ea3d36b0a6423a104782130e`)
    .then((response) => {
      this.setState({temp: Math.round(response.data.main.temp -273.15)}) 
      this.setState({weather: response.data.weather[0].main})
      this.setState({locationName: response.data.name})
    })
  }

  render() {
    if (this.state.lat && this.state.lon) {
        this.getWeather();
    }
    let imgsrc
    if (this.state.weather === "Clouds") {
        imgsrc = require('./../icons/Clouds.png')
    }
    if (this.state.weather === "Rain") {
        imgsrc = require('./../icons/Rain.png')
    }
    if (this.state.weather === "Clear") {
        imgsrc = require('./../icons/Rain.png')
    }
    let img
    if (imgsrc) {
        img = <img src={imgsrc} alt="Logo" />;
    }
    else {
        img = this.state.weather
    }
    let temp
    if (this.state.temp) {
        temp = <h3>{this.state.temp} degress</h3>
    }
    let locationName
    if (this.state.locationName) {
        locationName = <h3>{this.state.locationName}</h3>
    }

    return (
        <React.Fragment>
        <Row>
            <Col xs={6} >
                {img}
            </Col>
            <Col xs={6}>
                {temp}
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
                {locationName}
            </Col>
        </Row>
        </React.Fragment>
    );
  }
}

export default WeatherPreview;