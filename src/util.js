class Util {

	distanceBetweenPoints(origin,destination) {
		const p = 0.017453292519943295; 
		const c = Math.cos;
		const a = 0.5 - c((destination.lat - origin.lat) * p)/2 + 
		        c(origin.lat * p) * c(destination.lat * p) * 
		        (1 - c((destination.lng - origin.lng) * p))/2;

		return 12742 * Math.asin(Math.sqrt(a));
	}

	 getNearestLocation(origin,destinations){
		destinations.forEach((destination)=>{
			let distance = this.distanceBetweenPoints(origin,destination);
			destination.distance = distance;
		})

		destinations.sort(((a, b)=>{
	    	return a.distance - b.distance;
		}))

		return destinations[0];
	}
}

var instance = new Util();
export default instance

