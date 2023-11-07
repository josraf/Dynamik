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

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search Developers..."
    />
  );
}

export default Search;
