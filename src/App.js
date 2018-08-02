import React, { Component } from "react";
import "./App.css";
import SimpleMap from "./map";

class App extends Component {
  state = {
    coords: [],
    isloader: false
  };
  componentDidMount = () => {
    this.getLocalCoords()
  };
  //получение координат нахождения в данный момент
  getLocalCoords = () => {
    const showPosition = position => {
      this.setState({
        coords: [position.coords.latitude, position.coords.longitude],
        isloader: true
      });

    };
    const error = () => {
      this.setState({ coords: [55.751574, 37.573856], isloader: true });
    }
    navigator.geolocation.getCurrentPosition(showPosition, error);
  };
  render() {
    const { coords } = this.state;

    return <div className="App">
      {this.state.isloader ? <SimpleMap {...{ coords }} /> : null}
    </div>;
  }
}

export default App;
