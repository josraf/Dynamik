import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function Search({ onSearchDevs, refreshDevsList }) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedHandleSearch = useCallback(
    debounce((query) => handleSearch(query), 1000),
    []
  );

  const handleSearch = (query) => {
    axios.get(`http://localhost:3001/api/devs/${query}`).then((res) => {
      onSearchDevs(res.data);
    });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleRemoveSearch = () => {
    setSearchQuery(""); // Clear the search query
    refreshDevsList();
  };

  return (
    <div>
      <div className="search-container">
        <TextField
          label="🔎 Search Developers..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
