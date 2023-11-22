import axios from "axios";
import Box from "./components/Box.js";
import Main from "./components/Main.js";
import Form from "./components/Form.js";
import Search from "./components/Search.js";
import NavBar from "./components/NavBar.js";
import { useState, useEffect } from "react";
import DevsList from "./components/DevsList.js";
import DetailsCard from "./components/DetailsCards.js";

function App() {
  const [devs, setDevs] = useState([]);
  const [devsSearched, setDevsSearched] = useState(0);
  const [devDetails, setDevDetails] = useState(0);

  useEffect(() => {
    refreshDevsList();
  }, []);

  function refreshDevsList() {
    axios
      .get("http://localhost:3001/api/devs")
      .then((res) => setDevs(res.data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  function handleAddDevs(dev) {
    axios.post(`http://localhost:3001/api/devs`, { dev }).then((res) => {
      const newDev = res.data;
      setDevs([...devs, newDev]);
    });
  }

  function handleDetailsDev(dev) {
    axios.get(`http://localhost:3001/api/dev/${dev}`).then((res) => {
      setDevDetails(res.data);
    });
  }

  function handleSearchDevs(data) {
    setDevsSearched(data);
    setDevs(data);
  }

  function handleDeleteDev(dev) {
    axios.delete(`http://localhost:3001/api/devs/delete/${dev}`).then((res) => {
      refreshDevsList();
    });
  }

  function NumResults() {
    return (
      <p className="num-results">
        Found <strong>{devsSearched.length}</strong> results
      </p>
    );
  }

  return (
    <div className="App">
      <NavBar>
        <Search
          onSearchDevs={handleSearchDevs}
          refreshDevsList={refreshDevsList}
        />
        {devsSearched ? <NumResults /> : null}
      </NavBar>
      <Main>
        <Box>
          <Form onAddDevs={handleAddDevs} />
        </Box>

        <div className="box-specific">
          <Box>
            <DevsList
              onDeleteDev={handleDeleteDev}
              onDetailsDev={handleDetailsDev}
              onDevsList={devs}
            />
          </Box>
        </div>

        {devDetails ? <DetailsCard onDevDetails={devDetails} /> : <></>}
      </Main>
    </div>
  );
}

export default App;
