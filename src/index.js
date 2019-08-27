import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    const URL = "https://reqres.in/api/users";
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(
        x => this.setState({ data: x.data })
        // this.setState({
        //   data
        // })
      );
  }
  func = () => {
    var d = this.state.data;
    return d.map((el, i) => {
      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>
            <img alt="profile" src={el.avatar} />
          </td>
          <td>{el.first_name}</td>
          <td>{el.last_name}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.length > 0 && this.func()}</tbody>
        </table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
