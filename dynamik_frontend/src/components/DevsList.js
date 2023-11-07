import React from "react";
import axios from "axios";
import { useEffect } from "react";

export default class PersonList extends React.Component {
  state = {
    devs: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/api/devs`).then((res) => {
      const devs = res.data;
      this.setState({ devs });
    });
  }

  render() {
    return (
      <ul>
        {this.state.devs.map((dev) => (
          <>
            <li key={dev.id}>{dev.name}</li>
            <li>{dev.nickname}</li>
            <li>{dev.birth_date}</li>
            <li>{dev.stack}</li>
          </>
        ))}
      </ul>
    );
  }
}
