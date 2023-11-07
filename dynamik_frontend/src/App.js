import DevsList from "./components/DevsList.js";
import Form from "./components/Form.js";
import Search from "./components/Search.js";
import axios from "axios";

function App() {
  function handleAddDevs(dev) {
    console.log(dev);
    axios.post(`http://localhost:3001/api/devs`, { dev }).then((res) => {
      const devs = res.data;
    });
  }

  function handleSearchDevs(query) {
    axios.get(`http://localhost:3001/api/devs/${query}`).then((res) => {
      const devs = res.data;
    });
  }

  function handleDeleteDev(dev) {
    axios.delete(`http://localhost:3001/api/delete/${dev}`).then((res) => {
      const devs = res.data;
    });
  }

  return (
    <div className="App">
      <Form onAddDevs={handleAddDevs} />
      <DevsList onDeleteDev={handleDeleteDev} />
      <Search onSearchDevs={handleSearchDevs} />
    </div>
  );
}

export default App;
