import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useInput } from "./InputHelper";

export default function Convention() {
  const token="Test123";

  const [brewerySelectOptions, setBrewerySelectOptions] = useState([]);
  const [conventionVenue, setConventionVenue] = useState([]);
  
  const [conventionName, conventionNameInput] = useInput({ type: "text" });
  const [conventionDate, conventionDateInput] = useInput({ type: "date" });

  useEffect(() => {
    axios
      .get("https://api.openbrewerydb.org/breweries?by_city=san_diego")
      .then((response) => {
        const selectList = [];
        response.data.forEach(function (element) {
          selectList.push({ label: element.name, value: element.name });
        });
        setBrewerySelectOptions(selectList);
      });
  }, []);

  const createConvention = ()=>{
   axios.post("https://localhost:1234/convention",{
     name:conventionName,
     date:conventionDate,
     venue:conventionVenue,
   },
   {
     headers:{
       'authorization': `Basic ${token}`
     }
  })
  }
  const handleVenueChange = (venue)=>{
    setConventionVenue(venue.value)
    console.log(venue.value)
  }

  return (
    <div className="Convention">
      <h1>Create Convention</h1>
      <b>Convention Name: </b>
      {conventionNameInput} 
      <br />
      <b>Convention Date: </b>
      {conventionDateInput}
      <br />
      <b>Venue</b>
      <Select onChange={handleVenueChange} options={brewerySelectOptions} />
      <button onClick={createConvention}> Create</button>
    </div>
  );
}
