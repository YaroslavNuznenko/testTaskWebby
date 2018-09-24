import React, { Component } from "react";
import "whatwg-fetch";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions/movie";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movies = this.props.movies.map(movie => (
      <li key={movie.id} className="moviesList__item">
        <span>Title: {movie.title} </span>
        <button onClick={() => this.props.removeMovieHandler(movie.id)}>
          Remove
        </button>
        <Link to={"/movie/" + movie.id} movie={movie}>
          More info
        </Link>
      </li>
    ));
    return (
      <div className="home__list">
        <h4>Movies:</h4>
        <ul className="moviesList">{movies}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMovieHandler: movieId => dispatch(actions.removeMovie(movieId)),
    sortMovies: () => dispatch(actions.sortMovies())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
