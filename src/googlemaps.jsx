import React from 'react';
import { Button } from 'semantic-ui-react';
import { withGoogleMap ,GoogleMap, Marker} from "react-google-maps";
import _ from "lodash";

export default class GoogleMapView extends React.Component {
	constructor(){
		super();
	}


	render() {
		return (
		  <GettingStartedGoogleMap
		    containerElement={
		      <div style={{ height: `400px`, width: `70%` }} />
		    }
		    mapElement={
		      <div style={{ height: `100%`, width: `100%` }} />
		    }
		  />
		)
	}
}


const GettingStartedGoogleMap = withGoogleMap(props => (
	<GoogleMap
    	defaultZoom={12	}
    	defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
	>
  </GoogleMap>
));