//search bar
import "../styles/SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo-no-background.png";

export default function SearchBar(props) {
  let navigate = useNavigate();

  const showEvent = (id) => {
    navigate(`event/details/${id}`);
  };

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("SEARCH BAR PROPS DETECTED", props.evts);
  }, [props]);

  useEffect(() => {
    console.log("SEARCH INPUT", searchInput);
  }, [searchInput]);

  useEffect(() => {
    console.log("TEMP RESULTS:", searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setSearchResults([]);
    } else if (searchInput.length > 0) {
      let tempResults = [];
      console.log("DETECTED INPUT", searchInput);
      for (let i = 0; i < props.evts.length; i++) {
        if (props.evts[i].name.toLowerCase().startsWith(searchInput)) {
          tempResults.push(props.evts[i]);
        }
      }
      setSearchResults(tempResults);
    }
  }, [searchInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="search-container">
      <img src={logo} alt="eventpass-logo" className="logo" />
      <h2
        className="headline"
        style={{ paddingTop: "20px", paddingBottom: "25px" }}
      >
        No hidden fees, ever.
      </h2>
      <div className="search-input">
        <input
          type="text"
          className="searchbar"
          placeholder="Search thousands of memorable events"
          onChange={handleChange}
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="search-results">
        {!searchResults ? null : (
          <div className="results-container">
            <ul>
              {searchResults.slice(0, 2).map((result) => (
                <li
                  key={result.id}
                  className="result-card"
                  onClick={() => showEvent(result.id)}
                >
                  <img src={result.photo_url} alt={result.name} />
                  <p>{result.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
