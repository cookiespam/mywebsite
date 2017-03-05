import React from 'react';
import { Button } from 'semantic-ui-react';
import Util from './util.js';
import GoogleMapView from './googlemaps.jsx';

export default class App extends React.Component {
	constructor(){
		super();
		const api = "781CF461BB6606ADC767F3B357E848ED71527F0366CB7EAC";

		const nowcastURL = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast`;

		this.state = {
			res : null,
			userLocation: null,
		}

		this.getWeatherResponse(nowcastURL);
	}

	getWeatherResponse(url){
		let header = new Headers();
		header.append('api-key','73i6XQoTxM2r5FBEB6ggVE6VCuZSLlYd');
		let options = {
			headers: header,
		}

		url = url + '?date=' + Util.getDate() + '&date_time=' + Util.getISODateTime();

		fetch(url,options)
			.then(response => response.json())
	    	.then(response => {
	    		this.setState({res:response})
	    	})
	}

	render() {
		let desc,area,forecast,areaArray = [];
		let onclick = e => {
			this.forceUpdate()
		}

		if(this.state.res){
			desc = "2 hour nowcast";

			this.state.res.area_metadata.forEach((area)=>{
				areaArray.push({lat:area.label_location.latitude,lng:area.label_location.longitude,name:area.name})
			});

  			navigator.geolocation.getCurrentPosition((position) => {
  				let userLocation = {userLocation: {lat:position.coords.latitude,lng:position.coords.longitude}};
  				this.setState(userLocation);
			});

			if(this.state.userLocation && areaArray.length > 0){
				let nearestLocation = Util.getNearestLocation(this.state.userLocation,areaArray);
				area = nearestLocation.name;
				
				this.state.res.items[0].forecasts.forEach((item)=>{
					if(item.area === area){
						forecast = item.forecast
					}
				})			
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
