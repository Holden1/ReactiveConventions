import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useInput } from "./InputHelper";
import { useAuth0 } from "@auth0/auth0-react";

export default function Talk() {

  const { getAccessTokenSilently } = useAuth0();
  const [topicSelectOptions, setTopicSelectOptions] = useState([]);
    const [conventionSelectOptions, setConventionSelectOptions] = useState([]);
    const [createStatus, setCreateStatus] = useState([]);

    const [selectedConventionId, setConventionVenue] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState([]);

  const [talkName, talkNameInput] = useInput({ type: "text" });

  useEffect(() => {
    axios
      .get("https://gateway.marvel.com:443/v1/public/comics?limit=50&apikey=5229de549a0d48cda47ead38c44dca06")
      .then((response) => {
        const selectList = [];
        console.log(response)
        response.data.data.results.forEach(function (element) {
          selectList.push({ label: element.title, value: element.title });
        });
          setTopicSelectOptions(selectList);
      });
  }, []);

    useEffect(async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://localhost:44314/`,
                scope: "read:convention",
            });

            axios.get("https://localhost:44398/api/Conventions", 
                {
                    headers: {
                        'authorization': `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    const selectList = [];
                    console.log(response)
                    response.data.forEach(function (element) {
                        selectList.push({ label: element.name, value: element.id });
                    });
                    setConventionSelectOptions(selectList);

                })
        } catch (e) {
            console.log(e)
        }
    }, []);

  const handleConventionChange = (venueInput) => {
      setConventionVenue(venueInput.value);
      console.log(venueInput.value);
    };
    const handleTopicChange = (topicInput) => {
        setSelectedTopic(topicInput.value);
        console.log(topicInput.value);
    };
    const createTalk = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://localhost:44314/`,
                scope: "create:talk",
            });

            axios.post("https://localhost:44398/api/Talks", {
                conventionId: selectedConventionId,
                name: talkName,
                topic: selectedTopic,
            },
                {
                    headers: {
                        'authorization': `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    setCreateStatus(response.status);
                }).catch((error) => {
                    setCreateStatus(error.message);
                });
        } catch (e) {
            setCreateStatus(e)
        }

    }

  return (
    <div className="Talk">
      <h1>Create Talk</h1>
      <b>Talk Name: </b>
      {talkNameInput}
      <br />
      <b>Convention</b>
          <Select onChange={handleConventionChange} options={conventionSelectOptions} />
      <b>Topic</b>
          <Select onChange={handleTopicChange} options={topicSelectOptions} />
          <button className="btn btn-primary" onClick={createTalk}> Create</button>

          <p>Status: {createStatus}</p>
    </div>
  );
}
