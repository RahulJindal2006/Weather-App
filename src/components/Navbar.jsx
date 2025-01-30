import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close"; 
import "../styles/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchHistory((prev) =>
        [searchInput.trim(), ...prev.filter((item) => item !== searchInput)].slice(0, 5)
      );
      setSearchInput("");
    }
  };

  const handleRedirectClick = () => {
    window.open("https://www.linkedin.com/school/pmaccelerator/", "_blank");
  };

  const removeSearchItem = (item) => {
    setSearchHistory((prev) => prev.filter((historyItem) => historyItem !== item));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="navbar-title">Weather Dashboard</h1>
        </div>

        <div className="navbar-center">
          <TextField
            variant="outlined"
            placeholder="Enter Location"
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <SearchIcon
                  className="search-icon"
                  onClick={handleSearchClick}
                  style={{ cursor: "pointer" }}
                />
              ),
            }}
          />
          <Button
            variant="contained"
            className="search-button"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>

        <Button
          variant="contained"
          className="redirect-button"
          onClick={handleRedirectClick}
        >
          Visit PM Accelerator
        </Button>
      </div>

      {searchHistory.length > 0 && (
        <div className="search-history">
          {searchHistory.map((item, index) => (
            <div
              key={index}
              className="search-history-item"
              onClick={() => setSearchInput(item)}
            >
              {item}
              <CloseIcon
                className="remove-history-item"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the search input on click
                  removeSearchItem(item);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
