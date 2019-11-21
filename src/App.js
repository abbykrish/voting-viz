import React, { Component } from 'react';
import './App.css';

import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import TX from "@amcharts/amcharts4-geodata/region/usa/txLow";
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

am4core.useTheme(am4themes_animated);



class App extends Component {
  componentDidMount () {
    this.renderMap = this.renderMap.bind(this);
    this.renderMap();
  }

  renderMap() {
      var chart = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = TX;

      // Set projection
      chart.projection = new am4maps.projections.Miller();
      chart.zoomControl = new am4maps.ZoomControl();
      chart.zoomControl.align = "left";
      chart.zoomControl.height = 100;
      chart.centerMap = true;

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = am4core.color("#B8D7EF");

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#7cc0eb");
    }

    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
    render() {

      let mapCard =
      <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%' }}>
        <div class="mdc-card">
            <div id="chartdiv" style={{ width: "200%", height: "500px" }}></div>
        </div>
      </div>;

      return (
        <div class="wrap">
          <div class="contents">
            <div class="wrap">
              <div id="bannerimage"></div>
              <div class="float-left">
                {mapCard}
              </div>
            </div>
          </div>
        </div>

      );
    }

}

export default App;
