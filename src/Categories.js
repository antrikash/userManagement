import React from "react";

import "./styles.css";

import moment from "moment";

class Categories extends React.Component {
  state = {
    data: [],
    page: 1,
    totalPages: null,
    sizeOfPost: 25
  };

  fetchPost() {
    const URL = `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/categories`;
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(x => {
        this.setState({
          data: x.categories
        });
      });
  }

  componentDidMount() {
    this.fetchPost();
  }

  // words.filter(word => word.length > 6);
  func = () => {
    const data = this.state.data;

    console.log(data);
    return data.map((el, i) => {
      return (
        <tr key={i}>
          <th scope="row">{el.name}</th>
        </tr>
      );
    });
  };

  render() {
    console.log(this.state.data, "dsfdasfas");
    return (
      <div className="container">
        <div className="navbar  fixed-left navbar-lg navbar-light bg-light">
          <ul class="list-group">
            <li class="list-group-item">
              {" "}
              {this.state.data.length > 0 && this.func()}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;
