import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";

function Search({ onSearchDevs }) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedHandleSearch = useCallback(
    debounce((query) => onSearchDevs(query), 1000),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleRemoveSearch = () => {
    setSearchQuery(""); // Clear the search query
    onSearchDevs(""); // Trigger the search with an empty query
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
