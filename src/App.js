import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {

// Render: componentWillMount() -> render() -> componentDidMount()

// Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate

state = {}

componentDidMount(){
  this._getMovies();
}

_renderMovies = () => {
  const movies = this.state.movies.map((movie, index) => {
    return <Movie 
    title={movie.title} 
    poster={movie.medium_cover_image} 
    genres={movie.genres} 
    synopsis={movie.synopsis  }
    key={index}/>
})
  return movies
}

_getMovies = async() => {
  const movies = await this._callApi()
  this.setState({
    movies
  })
}

_callApi = () => {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
  .then(response => response.json())
  .then(json => json.data.movies)
  .catch(err => console.log(err))
}

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
         </div>
    );
  }
}

export default App;
