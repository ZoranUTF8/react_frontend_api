import "./app.css";

import History from "./components/History";
import { useState, useEffect } from "react";
import axios from "axios";
import SuggestionList from "./components/SuggestionList";

function App() {
  //? Default api route
  const defPath =
    "http://localhost:8080/demorest/api/v1/phone-numbers/autocomplete";

  //? State to hold user input
  const [inputText, setInputText] = useState("");
  //? State to hold persons
  const [persons, setPersons] = useState([]);
  //? State to hold autocomplete suggestions
  const [suggestion, setSuggestions] = useState([]);

  const fetchPersons = async (textIn) => {
    try {
      const response = await axios.get(defPath + `?query=${textIn}`);

      response.status === 200 && setPersons(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //? Import the persons data
  useEffect(() => {
    if (inputText.length === 0) {
      setPersons([]);
    } else {
      fetchPersons(inputText);
    }
  }, [inputText]);

  //? On change handler for the input field
  const onChangeHandler = (userTextInput) => {
    let matches = [];
    if (userTextInput.length > 0) {
      matches = persons.filter((person) => {
        const regex = new RegExp(`^[\s-]?${userTextInput}`, "gi");

        return person.phoneNumber.match(regex);
      });
    }

    setSuggestions(matches);
    setInputText(userTextInput);
  };

  return (
    <div className="App">
      <div className="leftContainer">
        <div className="titleContainer">
          <h3>Atlantbh</h3>
          <h4>Autocomplete search</h4>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            value={inputText}
            placeholder="Unesite broj..."
            onChange={(e) => onChangeHandler(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />

          {suggestion.length > 0 && (
            <SuggestionList
              suggestion={suggestion}
              setSuggestions={setSuggestions}
              setInputText={setInputText}
            />
          )}
        </div>
      </div>

      <div className="rightContainer">
        <History />
      </div>
    </div>
  );
}

export default App;
