const SuggestionList = ({ suggestion, setSuggestions, setInputText }) => {
  //? On suggestion click handler
  const onSuggestionClick = (suggestionText) => {
    setInputText(suggestionText);
    setSuggestions([]);
  };
  return (
    <>
      {suggestion.map((suggestion, indx) => (
        <div
          className="suggestionsContainer"
          key={indx}
          onClick={(e) => onSuggestionClick(suggestion.phoneNumber)}
        >
          <h4 className="suggestion">{suggestion.phoneNumber}</h4>
        </div>
      ))}
    </>
  );
};

export default SuggestionList;
