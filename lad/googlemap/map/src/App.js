import React, { Component } from 'react';
import './App.css';
import SimpleMap from "./map";

class App extends Component {
  state = {
    coords: [],
    isloader: false
  }
  componentDidMount = () => {
    this.getLocalCoords();
  }
  //получение координат нахождения в данный момент
  getLocalCoords = async () => {
    const showPosition = position => {
      this.setState({
        coords: [position.coords.latitude, position.coords.longitude],
        isloader: true
      })
    }
    navigator.geolocation.getCurrentPosition(showPosition)
  };
  render() {
    const { coords } = this.state

    return (
      <div className="App">
        {this.state.isloader ?
          <SimpleMap {...{ coords }} /> : null
        }
      </div>
    );
  }
}

export default App;
