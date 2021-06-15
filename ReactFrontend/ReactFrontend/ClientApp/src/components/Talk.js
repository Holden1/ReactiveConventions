import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useInput } from "./InputHelper";

export default function Talk() {
  const token = "Test123";

  const [brewerySelectOptions, setBrewerySelectOptions] = useState([]);
  const [conventionVenue, setConventionVenue] = useState([]);

  const [conventionName, conventionNameInput] = useInput({ type: "text" });

  useEffect(() => {
    axios
      .get("https://gateway.marvel.com:443/v1/public/comics?limit=50&apikey=5229de549a0d48cda47ead38c44dca06")
      .then((response) => {
        const selectList = [];
        console.log(response)
        response.data.data.results.forEach(function (element) {
          selectList.push({ label: element.title, value: element.title });
        });
        setBrewerySelectOptions(selectList);
      });
  }, []);

  const createConvention = () => {
    axios.post(
      "https://localhost:1234/convention",
      {
        name: conventionName,
        date: conventionDate,
        venue: conventionVenue
      },
      {
        headers: {
          authorization: `Basic ${token}`
        }
      }
    );
  };
  const handleVenueChange = (venue) => {
    setConventionVenue(venue.value);
    console.log(venue.value);
  };

  return (
    <div className="Talk">
      <h1>Create Talk</h1>
      <b>Talk Name: </b>
      {conventionNameInput}
      <br />
      <b>Convention</b>
      <Select onChange={handleVenueChange} options={brewerySelectOptions} />
      <b>Topic</b>
      <Select onChange={handleVenueChange} options={brewerySelectOptions} />
      <button onClick={createConvention}> Create</button>
    </div>
  );
}
