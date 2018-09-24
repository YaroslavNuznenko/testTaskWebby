import * as actionTypes from "./actionTypes";

export const addMovie = (movies, newMovie) => {
  let isUpdate = true;
  movies.forEach((m, i) => {
    if (m.id === newMovie.id) {
      isUpdate = false;
    }
  });

  if (isUpdate) movies.unshift(newMovie);

  let updatedMovies = [...movies];

  return {
    type: actionTypes.ADD_MOVIE,
    movies: updatedMovies
  };
};

export const sortMovies = () => {

    return {
      type: actionTypes.SORT_MOVIES
    //   movies: movies
    };
  };


export const setMovies = movies => {
  return {
    type: actionTypes.SET_MOVIES,
    movies: movies
  };
};

export const initMovies = () => {
  return dispatch => {
    fetch("/api/movies/")
      .then(res => res.json())
      .then(json => {
        dispatch(setMovies(json));
      })
      .catch(err => dispatch(console.log(err)));
  };
};

export const removeMovie = id => {
  fetch("/api/remove", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "same-origin"
  })
    .then(data => data)
    .catch(e => console.log(e));
  return {
    type: actionTypes.REMOVE_MOVIE,
    movieId: id
  };
};
