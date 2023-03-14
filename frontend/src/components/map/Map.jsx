import React, { useState, useEffect } from "react";
import { 
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow, 
 } from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles"
import Panel, { setInfo } from "../Panel";
import Review from "../Review";
// import "@reach.combobox/styles.css"
import "./Map.css"




const center={lat: -33.9172344, lng: 151.2311395 }

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomcontrol: true,
	gestureHandling: "greedy",
}

const mapContainerStyle = {
	width: "100vw",
	height: "100vh",
};

const libraries = ['places'];

export default function GMap () {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
		callbackName: "initMap",
	});

	const [locations, setLocations] = useState({});
	const [selected, setSelected] = useState(null);
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [isReviewOpen, setIsReviewOpen] = useState(false);

	// get locations from backend
	useEffect(() => {
		fetch("http://localhost:5000/toilets")
			.then((res) => res.json())
			.then((data) => {
				setLocations(data);
			});
	}, []);

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading Maps";


	return (
		<div className="Maps backdrop">
			{/* <h1>Pewp on Campus 💩</h1> */}
			{isReviewOpen && (
        		<Review info={selected} onClose={() => setIsReviewOpen(false)}/>
        	)}
			<GoogleMap 
				mapContainerStyle={mapContainerStyle} 
				zoom={17} 
				center={center}
				options={options}>

				{Object.keys(locations).map((key) => (
					<Marker
						key={key}
						position={{
							lat: locations[key].location._latitude,
							lng: locations[key].location._longitude,
						}}
						onClick={() => {
							setSelected(locations[key]);
							setIsPanelOpen(true);
						}}
						icon={{
							url: "/toilet-icon.svg",
							scaledSize: new window.google.maps.Size(40, 40),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(20, 20)
						}}
					/>
				))}

				{isPanelOpen && (
          			<Panel info={selected} onClose={() => setIsPanelOpen(false)} isReviewOpen={isReviewOpen} setIsReviewOpen={setIsReviewOpen}/>
        		)}
			</GoogleMap>
		</div>
	);
}




