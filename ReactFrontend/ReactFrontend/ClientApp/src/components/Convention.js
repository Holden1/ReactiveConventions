import React, { useRef,useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useInput } from "./InputHelper";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmhvbGRlbiIsImEiOiJja3EzbTZid3YwbDV5MnBvMGp3azE0d21yIn0.oUGw687AGeGaco3E7X5UjQ';

export default function Convention() {

    const { getAccessTokenSilently } = useAuth0();
    const [breweries, setBreweries] = useState([]);
    const [brewerySelectOptions, setBrewerySelectOptions] = useState([]);
    const [conventionVenue, setConventionVenue] = useState([]);
    const [createConventionStatus, setCreateConventionStatus] = useState([]);
  
    const [conventionName, conventionNameInput] = useInput({ type: "text" });
    const [conventionDate, conventionDateInput] = useInput({ type: "date" });


    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(77.0365); 
    const [lat, setLat] = useState(38.8977);
    const [zoom, setZoom] = useState(5);

  useEffect(() => {
    axios
      .get("https://api.openbrewerydb.org/breweries?by_dist=38.8977,77.0365")
      .then((response) => {
        const selectList = [];
        response.data.forEach(function (element) {
          selectList.push({ label: element.name, value: element.name });
        });
          setBrewerySelectOptions(selectList);
          setBreweries(response.data);
      });
  }, []);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    },[]);

    const createConvention = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://localhost:44314/`,
                scope: "create:convention",
            });

            axios.post("https://localhost:44398/api/Conventions", {
                name: conventionName,
                date: conventionDate,
                venue: conventionVenue,
            },
                {
                    headers: {
                        'authorization': `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    setCreateConventionStatus(response.status);
                }).catch((error) => {
                    setCreateConventionStatus(error.message);
                });
        } catch (e) {
            setCreateConventionStatus(e)
        }
        
  }
  const handleVenueChange = (venue)=>{
      setConventionVenue(venue.value)
      breweries.forEach(function (element) {

          if (element.name == venue.value && lng != null) {
              map.current.setCenter({ lng: element.longitude, lat: element.latitude })
          }
      });
    console.log(venue.value)
  }

  return (
    <div className="Convention">
      <h1>Create Convention</h1>
          <div className="row row-cols-2">
              <div className="col">
                  <div className="row row-cols-2">
                      <div className="col"><b>Convention Name: </b></div>
                      <div className="col">{conventionNameInput}</div>
                  </div>
                  <br />
                  <div className="row row-cols-2">
                      <div className="col"><b>Convention Date: </b></div>
                      <div className="col">{conventionDateInput}</div>
                  </div>            
                  <br />
                  
                </div>
              <div className="col">
                  <b>Venue</b>
                  <Select onChange={handleVenueChange} options={brewerySelectOptions}/>
                  <div ref={mapContainer} className="map-container" />
              </div>

          </div>
          <button className="btn btn-primary" onClick={createConvention}> Create</button>
          <p>Status: { createConventionStatus}</p>
    </div>
  );
}
