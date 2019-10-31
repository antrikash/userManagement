import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Pagination from "./Pagination";
import Categories from "./Categories";
import Header from "./Header";

import moment from "moment";

class App extends React.Component {
  state = {
    data: [],
    page: 1,
    totalPages: null,
    sizeOfPost: 25
  };

  fetchPost() {
    const URL = `https://public-api.wordpress.com/rest/v1.1/sites/truecaller.blog/posts/?number=${
      this.state.sizeOfPost
    }`;
    fetch(URL)
      .then(function(response) {
        return response.json();
      })
      .then(x => {
        this.setState({
          data: x.posts
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
    return data.map(el => {
      return (
        <div key={el.ID} class="card mb-3">
          <img src={el.post_thumbnail.URL} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{el.title}</h5>
            <p class="card-text">{el.excerpt}</p>
            <p class="card-text">
              <small class="text-muted">
                <time>{moment(el.modified).fromNow()}</time>
              </small>
            </p>
          </div>
        </div>
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
      <div>
        <div>
          <Header />
        </div>
        <div className="container">
          <div className="panel-body ">
            {this.state.data.length > 0 && this.func()}

            <Pagination
              page={this.state.page}
              totalPages={this.state.totalPages}
              pageChange={this.pageChange}
            />
            <Categories />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
