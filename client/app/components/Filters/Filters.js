import React, { Component } from "react";
import "whatwg-fetch";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions/movie";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSearch: true,
      searchedIsActive: false,
      searchMovies: []
    };
  }
  searchByTitle(event) {
    let value = event.target.value;
    if (value !== "") {
      fetch("/api/search/title/?value=" + value, {
        method: "GET"
      })
        .then(res => res.json())
        .then(resultMovies => {
          console.log(resultMovies);
          this.setState({ searchMovies: resultMovies, searchedIsActive: true  });
        })
        .catch(err => console.log(err));
      } else{
        this.setState({ searchedIsActive: false });
    }
  }

  searchByActor(event) {
    let value = event.target.value;
    if (value !== "") {
      fetch("/api/search/actor/?value=" + value, {
        method: "GET"
      })
        .then(res => res.json())
        .then(resultMovies => {
          console.log(resultMovies);
          this.setState({ searchMovies: resultMovies, searchedIsActive: true  });
        })
        .catch(err => console.log(err));
      } else{
        this.setState({ searchedIsActive: false });
    }
  }

  toggleSearch() {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  }

  render() {
    console.log(this.state.searchMovies);
    let movies = this.state.searchMovies.map( movie => (
        <li key={movie.id}>
          <span> {movie.title} </span>
          <span> {movie.stars} </span>
          <Link to={'/movie/'+ movie.id}>
            More info
          </Link>
        </li>
    ));

    let searchListClasses = this.state.searchedIsActive ?  "searchedList active" : "searchedList";
    return (
      <div className="filters">
        <div>
        <h4>Filters: </h4>
          <button onClick={() => this.props.sortMovies()}>Sort by title</button>
        </div>
        <div className="filters__wrap">
          <button onClick={() => this.toggleSearch()}>
            Toggle search type
          </button>
          <div className="searchedBlock">
            {this.state.toggleSearch ? (
              <input
                onChange={event => this.searchByTitle(event)}
                type="text"
                placeholder="Search by title"
              />
            ) : (
              <input
                onChange={event => this.searchByActor(event)}
                type="text"
                placeholder="Search by actor"
              />
            )}
            <ul className={searchListClasses}>
              {movies}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortMovies: () => dispatch(actions.sortMovies())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Filters)
);
