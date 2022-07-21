import "./app.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SuggestionList from "./components/SuggestionList";
import logo from "./images/at.jpg";

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
    if (inputText === "") {
      return;
    } else {
      fetchPersons(inputText);
    }
  }, [inputText]);

  //? On change handler for the input field
  const onChangeHandler = (userTextInput) => {
    let matches = [];

    if (userTextInput.length > 0) {
      matches = persons.filter((person) => {
        return person.phoneNumber.includes(userTextInput);
      });
    }

    setSuggestions(matches);
    setInputText(userTextInput);
  };

  return (
    <div className="App">
      <div className="leftContainer">
        <div className="titleContainer">
          <img src={logo} alt="" className="logoImg" />
          <h3>Atlantbh zadatak</h3>
          <h4>Zoran Janjic</h4>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            value={inputText}
            onChange={(e) => onChangeHandler(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />

          {suggestion.length > 0 ? (
            <SuggestionList
              suggestion={suggestion}
              setSuggestions={setSuggestions}
              setInputText={setInputText}
            />
          ) : (
            <div>
              <h3 className="noSuggestions">No suggestions :(</h3>
            </div>
          )}
        </div>
      </div>

      <div className="rightContainer">some output</div>
    </div>
  );
}

export default App;
