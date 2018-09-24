import React from "react";
import MoviesList from "../MoviesList/MoviesList";
import SideBar from "../SideBar/SideBar";
import UploadFile from "../UploadFile/UploadFile";
import Filters from "../Filters/Filters";

const Home = () => {
  return (
    <div className="container">
      <UploadFile />
      <Filters />
      <div className="home">
        <MoviesList />
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
