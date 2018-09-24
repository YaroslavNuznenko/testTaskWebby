import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";


import * as actions from "../../store/actions/movie";
import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

class App extends Component{
  componentDidMount() {
    this.props.initMovies();
  }

  render(){
    return (
  
      <div>
        <Header />
    
        <main>
          {this.props.children}
        </main>
    
        {/* <Footer /> */}
      </div>
    );
  }
}
  

const mapDispatchToProps = dispatch => {
  return {
    initMovies: () => dispatch(actions.initMovies())
  };
};


export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
