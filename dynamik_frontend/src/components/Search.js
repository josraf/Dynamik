import axios from "axios";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";

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
      <input
        className="search"
        type="text"
        placeholder="Search Developers..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn-add" onClick={handleRemoveSearch}>
        X
      </button>
    </div>
  );
}

export default Search;
