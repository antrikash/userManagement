import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Pagination from "./Pagination";
class App extends React.Component {
  state = {
    data: [],
    page: 1,
    totalPages: null
  };

  fetch2() {
    const URL = `https://reqres.in/api/users?page=${this.state.page}`;
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(x => {
        this.setState({
          data: x.data,
          page: x.page,
          totalPages: x.total_pages
        });
      });
  }

  componentDidMount() {
    this.fetch2();
  }

  removeData = id => {
    const data = this.state.data;
    const newData = data.filter(e => e.id !== id);
    console.log("XYZ", newData);
    this.setState({
      data: newData
    });
  };
  // words.filter(word => word.length > 6);
  func = () => {
    var d = this.state.data;
    return d.map((el, i) => {
      return (
        <tr key={i}>
          <th scope="row">{el.id}</th>
          <td>
            <img alt="profile" className="icon" src={el.avatar} />
          </td>
          <td>{el.first_name}</td>
          <td>{el.last_name}</td>
          <td>
            <button class="btn btn-secondary">Edit</button>
            <span> </span>
            <button
              onClick={() => this.removeData(el.id)}
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  pageChange = page => {
    this.setState(
      {
        page
      },
      () => this.fetch2()
    );
  };
  render() {
    return (
      <div class="container">
        <div class="panel-body">
          <div class="table-responsive">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">AVATAR</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>{this.state.data.length > 0 && this.func()}</tbody>
            </table>
            <Pagination
              page={this.state.page}
              totalPages={this.state.totalPages}
              pageChange={this.pageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
