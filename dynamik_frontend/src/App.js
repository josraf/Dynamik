import DevsList from "./components/DevsList.js";
import Form from "./components/Form.js";
import Search from "./components/Search.js";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [devs, setDevs] = useState([]);
  const [devsSearched, setDevsSearched] = useState(0);

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
    axios.get(`http://localhost:3001/api/devs/${query}`).then((res) => {
      setDevsSearched(res.data);
    });
  }

  function handleDeleteDev(dev) {
    axios.delete(`http://localhost:3001/api/devs/delete/${dev}`).then((res) => {
      refreshDevsList();
    });
  }

  function NavBar({ children }) {
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    );
  }

  function Logo() {
    return (
      <div className="logo">
        <span role="img">👨‍💻</span>
        <h1>Dynamik Exercise</h1>
      </div>
    );
  }
  function NumResults() {
    return (
      <p className="num-results">
        Found <strong>{devsSearched.length}</strong> results
      </p>
    );
  }

  function Main({ children }) {
    return <main className="main">{children}</main>;
  }

  function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>

        {isOpen && children}
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar>
        <Search onSearchDevs={handleSearchDevs} />
        {devsSearched ? <NumResults /> : null}
      </NavBar>
      <Main>
        <Box>
          <DevsList onDeleteDev={handleDeleteDev} onDevsList={devs} />
        </Box>

        <Box>
          <Form onAddDevs={handleAddDevs} />
        </Box>
      </Main>
    </div>
  );
}

export default App;
