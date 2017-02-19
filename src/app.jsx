import React from 'react';
import { Button } from 'semantic-ui-react';
import xml2js from 'xml2js';
import Util from './util.js';
import GoogleMapView from './googlemaps.jsx';

export default class App extends React.Component {
	constructor(){
		super();
		const api = "781CF461BB6606ADC767F3B357E848ED71527F0366CB7EAC";

		const nowcastURL = `http://api.nea.gov.sg/api/WebAPI/?dataset=2hr_nowcast&keyref=${api}`;
		const forecastURL = `http://api.nea.gov.sg/api/WebAPI/?dataset=24hrs_forecast&keyref=${api}`;
		const outlookURL = `http://api.nea.gov.sg/api/WebAPI/?dataset=4days_outlook&keyref=${api}`;
		const heavyRainWarningURL = `http://api.nea.gov.sg/api/WebAPI/?dataset=heavy_rain_warning&keyref=${api}`;

		this.state = {
			res : null,
			userLocation: null,
		}

		this.getWeatherResponse(nowcastURL);
		this.weather = {
			BR:"Mist",
			CL:"Cloudy",
			DR:"Drizzle",
			FA:"Fair (Day)",
			FG:"Fog",
			FN:"Fair (Night)",
			FW:"Fair & Warm",
			HG:"Heavy Thundery Showers with Gusty Winds",
			HR:"Heavy Rain",
			HS:"Heavy Showers",
			HT:"Heavy Thundery Showers",
			HZ:"Hazy",
			LH:"Slightly Hazy",
			LR:"Light Rain",
			LS:"Light Showers",
			OC:"Overcast",
			PC:"Partly Cloudy (Day)",
			PN:"Partly Cloudy (Night)",
			PS:"Passing Showers",
			RA:"Moderate Rain",
			SH:"Showers",
			SK:"Strong Winds, Showers",
			SN:"Snow",
			SR:"Strong Winds, Rain",
			SS:"Snow Showers",
			SU:"Sunny",
			SW:"Strong Winds",
			TL:"Thundery Showers",
			WC:"Windy, Cloudy",
			WD:"Windy",
			WF:"Windy, Fair",
			WR:"Windy, Rain",
			WS:"Windy, Showers",
		}
	}

	getWeatherResponse(url){
		var parser = new xml2js.Parser();
		fetch(url)
			.then(response => response.text())
	    	.then(xmlString => {
	    		parser.parseString(xmlString, (err, result) => {
	    			this.setState({res:result.channel})
					return result;
				});
	    	})
	}

	render() {
		let desc,area,forecast,arr = [];
		let onclick = e => {
			this.forceUpdate()
		}

		if(this.state.res){
			console.log(this.state.res);
			desc = this.state.res.description;

			this.state.res.item[0].weatherForecast[0].area.forEach((area)=>{
				arr.push({lat:area.$.lat,lng:area.$.lon,forecast:area.$.forecast,name:area.$.name})
			});

  			navigator.geolocation.getCurrentPosition((position) => {
  				let userLocation = {userLocation: {lat:position.coords.latitude,lng:position.coords.longitude}};
  				this.setState(userLocation);
			});
			if(this.state.userLocation && arr.length > 0){
				let a = Util.getNearestLocation(this.state.userLocation,arr);
				area = a.name;
				forecast = this.weather[a.forecast]
			}			
		}

		return (
		  <div>
		    <Button onClick={onclick}>
				Refresh
				</Button>
		    <h1>{desc}</h1>
		    <h2>{area}</h2>
		    <h2>{forecast}</h2>
		    <GoogleMapView />
		  </div>
		)
	}
}
