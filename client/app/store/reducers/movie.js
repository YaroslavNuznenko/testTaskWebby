import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movies: []
};

const addMovie = (state, action) => {
  let updatedState = { movies: action.movies };

  return {
    ...state,
    ...updatedState
  };
};

const setMovies = (state, action) => {
  let updatedState = {
    movies: action.movies
  };
  return {
    ...state,
    ...updatedState
  };
};

const sortMovies = (state) => {
  let movies = [...state.movies];
  console.log(movies, 'movies');
  movies.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });
  console.log(movies, 'sort movies');
  let updatedState = {
    movies: movies
  };
  return {
    ...state,
    ...updatedState
  };
};

const removeMovie = (state, action) => {
  let updatedMovies = state.movies.filter(m => {
    return m.id !== action.movieId;
  });
  let updatedState = {
    movies: updatedMovies
  };

  return {
    ...state,
    ...updatedState
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      return addMovie(state, action);
    case actionTypes.REMOVE_MOVIE:
      return removeMovie(state, action);
    case actionTypes.SET_MOVIES:
      return setMovies(state, action);
    case actionTypes.SORT_MOVIES:
      return sortMovies(state, action);
    default:
      return state;
  }
};

export default reducer;
