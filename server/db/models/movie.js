
class Movie {

  constructor(title, release_year, format, stars, id){
    this.id = id
    this.title=title;
    this.release_year=release_year;
    this.format=format;
    this.stars=stars;
  }

}

module.exports = Movie;