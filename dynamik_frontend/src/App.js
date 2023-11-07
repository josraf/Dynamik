import DevsList from "./components/DevsList.js";
import Form from "./components/Form.js";
import Search from "./components/Search.js";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [devs, setDevs] = useState([]);

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

  function handleSearchDevs(query) {
    axios.get(`http://localhost:3001/api/devs/${query}`).then((res) => {});
  }

  function handleDeleteDev(dev) {
    axios.delete(`http://localhost:3001/api/devs/delete/${dev}`).then((res) => {
      refreshDevsList();
    });
  }

  return (
    <div className="App">
      <Form onAddDevs={handleAddDevs} />
      <DevsList onDeleteDev={handleDeleteDev} onDevsList={devs} />
      <Search onSearchDevs={handleSearchDevs} />
    </div>
  );
}

export default App;
