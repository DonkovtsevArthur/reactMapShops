import React, { Component } from "react";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";
import map from "./map.png";

class SimpleMap extends Component {
  state = {
    data: [],
    mapState: {
      center: this.props.coords,
      zoom: 10,
      behaviors: ["default", "scrollZoom"],
      //отключение дефолтные кнопки у яндекс карт
      controls: []
    }
  };

  componentDidMount = () => {
    this.setState({
      data: this.getPoints(2600)
    });
  };

  // рандом координатов
  getPoints = shops => {
    const fillArray = (min, max, len) => {
      let el = [];
      let coordOne = Math.random() * (max - min + 1) + min;
      let coordTwo = Math.random() * (max - min + 1) + min - 10;
      for (let y = 0; y < len; y++) {
        el.push(coordOne, coordTwo);
      }
      return el;
    };
    let point = [];
    for (let i = 0; i < shops; i++) {
      point.push(fillArray(40, 60, 2));
    }
    return point;
  };

  getPointData = index => {
    return {
      balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
      clusterCaption: "placemark <strong>" + index + "</strong>"
    };
  };

  getPointOptions = () => {
    return {
      iconLayout: "default#image",
      iconImageHref: map,
      iconImageSize: [50, 50],
      iconImageOffset: [-3, -42]
    };
  };
  render() {
    const { data, mapState } = this.state;

    return (
      <YMaps>
        <Map state={mapState} width={"100%"} height={"100%"}>
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
              clusterDisableClickZoom: true,
              clusterHideIconOnBalloonOpen: false,
              geoObjectHideIconOnBalloonOpen: false
            }}
          >
            {data.map((coordinates, idx) => (
              <Placemark
                key={idx}
                geometry={{ coordinates }}
                properties={this.getPointData(idx)}
                options={this.getPointOptions()}
              />
            ))}
          </Clusterer>
        </Map>
      </YMaps>
    );
  }
}

export default SimpleMap;
