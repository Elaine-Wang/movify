import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Button, Image, Card } from 'semantic-ui-react'

import styles from './Gallery.scss'

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      name: null,
      resultsList: [],
      id: null,
      page: '1',
      genre: '',
    }
    this.loadGallery = this.loadGallery.bind(this);
    this.pushToDetail = this.pushToDetail.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadGallery() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=14efa05d15268965b34816286e0035bd&language=en-US&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=true&include_video=true&page=${this.state.page}`)
      .then(function(response) {
          this.setState({
              resultsList: response.data.results,
          });
      }.bind(this),);
  }

  filterGenre(e) {
    var filterType = e.target.id;
    var currentPage = this.state.page;
    this.setState({
      genre: filterType,
      page: '1',
    }, () => this.loadGallery());
  }

  nextPage(e) {
    var currentPage = Number(this.state.page);
    this.setState({
      page: (currentPage + 1).toString(),
    }, () => this.loadMore());
  }

  loadMore() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=14efa05d15268965b34816286e0035bd&language=en-US&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=true&include_video=true&page=${this.state.page}`)
    .then(function(response) {
      this.setState({
        resultsList: this.state.resultsList.concat(response.data.results),
      });
    }.bind(this));
  }

  pushToDetail(index) {
    this.props.history.push ({
      pathname: '/detail',
      id: index,
      movies: this.state.resultsList
    });
  }

  componentDidMount() {
    this.loadGallery();
  }

  render() {
    return(
      <div className="Gallery">
        <Divider hidden/><Divider hidden/>
        <Button className="mybutton" id={this.props.genre} onClick={this.filterGenre}>All</Button>
        <Button id="28" className="mybutton" onClick={this.filterGenre}>Action</Button>
        <Button id="12" className="mybutton" onClick={this.filterGenre}>Adventure</Button>
        <Button id="16" className="mybutton" onClick={this.filterGenre}>Animation</Button>
        <Button id="35" className="mybutton" onClick={this.filterGenre}>Comedy</Button>
        <Button id="80" className="mybutton" onClick={this.filterGenre}>Crime</Button>
        <Button id="99" className="mybutton" onClick={this.filterGenre}>Documentary</Button>
        <Button id="18" className="mybutton" onClick={this.filterGenre}>Drama</Button>
        <Button id="14" className="mybutton" onClick={this.filterGenre}>Fantasy</Button>
        <Button id="36" className="mybutton" onClick={this.filterGenre}>History</Button>
        <Button id="27" className="mybutton" onClick={this.filterGenre}>Horror</Button>
        <Button id="10402" className="mybutton" onClick={this.filterGenre}>Music</Button>
        <Button id="9648" className="mybutton" onClick={this.filterGenre}>Mystery</Button>
        <Button id="10749" className="mybutton" onClick={this.filterGenre}>Romance</Button>
        <Button id="878" className="mybutton" onClick={this.filterGenre}>Sci-Fi</Button>
        <Button id="53" className="mybutton" onClick={this.filterGenre}>Thriller</Button>
        <Button id="10752" className="mybutton" onClick={this.filterGenre}>War</Button>
        <Button id="37" className="mybutton" onClick={this.filterGenre}>Western</Button>
        <Divider hidden/>
        <Card.Group className="moviesgallery" itemsPerRow={5}> {
          this.state.resultsList.map((movie, index) => {
            return (
              <Card className="hover" key={index+"card"}>
              <Image onClick={function(){this.pushToDetail(index)}.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "poster"} />
              </Card>
            )
          })
        }
        </Card.Group>
        <Divider hidden/>
        <Button className="mybutton" onClick={this.nextPage}>LOAD MORE</Button>
        </div>
    )
  }
}

export default Gallery