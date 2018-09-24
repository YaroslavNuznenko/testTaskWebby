import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";


const Movie = props => {
  let movieId = +props.match.params.id;
  let movie = {};
  props.movies.forEach(el=> {
    if(el.id === movieId){
      movie = el;
    }
  });
  console.log(props , movieId, movie);
  return (
    <div className='movie container'>
      <span>Title: {movie.title} </span>
      <span>Release year: {movie.release_year}</span>
      <span>Format: {movie.format}</span>
      <span>Stars: {movie.stars}</span>
    </div>
  );
};

const mapStateToProps = state => {
  return {
      movies: state.movies,
  };
};



export default withRouter(
  connect(
    mapStateToProps
  )(Movie)
);