import React, { Component } from 'react'
import axios from 'axios'
import {render} from 'react-dom';
import { Dropdown, Form, Divider, Button, Input, Image, Label, Card } from 'semantic-ui-react'

import styles from './Home.scss'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      id: null,
      poster: null,
      resultsList: [],
      ascending: false,
      currentSort: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.selectOrder = this.selectOrder.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.ratingSort = this.ratingSort.bind(this);
    this.popularitySort = this.popularitySort.bind(this);
    this.voteSort = this.voteSort.bind(this);
    this.pushToDetail = this.pushToDetail.bind(this);
    this.ascendingSort = this.ascendingSort.bind(this);
    this.descendingSort = this.descendingSort.bind(this);
  }

  //MOVIE SEARCH

  handleChange(e) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=14efa05d15268965b34816286e0035bd&query=' + e.target.value + '&include_adult=true')
      .then(function (response) {
        this.setState(function() {
          return {
            resultsList: response.data.results,
          }
        });
      }.bind(this));
  }

  //FILTERING

  selectOrder(e, data) {
    if (data.value == 'true') {
      this.setState(function() {
        return {
          ascending: true,
        }
      }, () => (this.ascendingSort.call(this)) );
    }
    else {
      this.setState(function() {
        return {
          ascending: false,
        }
      }, () => (this.descendingSort.call(this)) );
    }
  }

  filterResults(e, data) {
    this.setState(function() {
      return {
        currentSort: data.value,
      }
    }, () => (this.callSort.call(this)) );
}

  callSort() {
    if (this.state.currentSort == 'popularity') {
        this.popularitySort.call(this);
    }
    else if (this.state.currentSort == 'vote_count') {
        this.voteSort.call(this);
    } else if (this.state.currentSort == 'vote_average') {
        this.ratingSort.call(this);
    }
  }

  ratingSort() {
    let releaselist = this.state.resultsList;
    if(this.state.ascending == 'false') {
      releaselist.sort(function(one, two) {
        return one.vote_average - two.vote_average;
      })
    }
    else {
      releaselist.sort(function(one, two) {
        return two.vote_average - one.vote_average;
      })
    }
    this.setState(function() {
      return {
        resultsList: releaselist,
      }
    });
  }

  popularitySort() {
    let popularlist = this.state.resultsList;
    if(this.state.ascending == 'false') {
      popularlist.sort(function(one, two) {
        return one.popularity - two.popularity;
      })
    }
    else {
      popularlist.sort(function(one, two) {
        return two.popularity - one.popularity;
      })
    }
    this.setState(function() {
      return {
        resultsList: popularlist,
      }
    });
  }

  voteSort() {
    let votelist = this.state.resultsList;
    if(this.state.ascending == 'false') {
      votelist.sort(function(one, two) {
        return one.vote_count - two.vote_count;
      })
    }
    else {
      votelist.sort(function(one, two) {
        return two.vote_count - one.vote_count;
      })
    }
    this.setState(function() {
      return {
        resultsList: votelist,
      }
    });
  }

  ascendingSort() {
    let list = this.state.resultsList;
    if(this.state.currentSort == 'popularity') {
      list.sort(function(one, two) {
        return one.popularity - two.popularity;
      })
    }
    else {
      list.sort(function(one, two) {
        return one.vote_count - two.vote_count ;
      })
    }
    this.setState(function() {
      return {
        resultsList: list,
      }
    });
  }

  descendingSort() {
    let list = this.state.resultsList;
    if(this.state.currentSort == 'vote_count') {
      list.sort(function(one, two) {
        return two.vote_count - one.vote_count ;
      })
    }
    else {
      list.sort(function(one, two) {
        return two.vote_count - one.vote_count ;
      })
    }
    this.setState(function() {
      return {
        resultsList: list,
      }
    });
  }

  //GO TO DETAIL VIEW

  pushToDetail(index) {
    this.props.history.push ({
      pathname: '/detail',
      id: index,
      movies: this.state.resultsList,
    });
  }

  render() {

    const { currentSort } = this.state
    const { ascending } = this.state
    const { match, location, history } = this.props
    const options = [
      { key: 'popularity', text: 'popularity', value: 'popularity' },
      { key: 'vote_average', text: 'rating', value: 'vote_average' },
      { key: 'vote_count', text: 'number of votes', value: 'vote_count' },
    ]
        return(
            <div className="Home">
               <div className="searchBar">
                <Form>
                   <Form.Field>
                     <input type='text' onChange={e => this.handleChange(e)} placeholder='movie'/>
                   </Form.Field>
                  </Form>
                  <Dropdown placeholder='filter by' fluid search selection options={options} selection value={currentSort} onChange={this.filterResults.bind(this)}/>
                  <Button.Group fluid>
                    <Button className="mybutton" value="false" onClick={this.selectOrder.bind(this)}>descending</Button>
                    <Button className="mybutton" value="true" onClick={this.selectOrder.bind(this)}>ascending</Button>
                  </Button.Group>
               </div>
               <Card.Group itemsPerRow={5} className="movies"> {
                  this.state.resultsList.map((movie, index) => {
                    return (
                      <Card className="hoverme" key={index + "item"}>
                      <Image className="centerMe" onClick={function(){this.pushToDetail(index)}.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "image"} />
                        <Card.Content key={index + "title"}>
                          {movie.title}
                        </Card.Content>
                        <Card.Content extra key={index + "rating"}>
                          Rating: {movie.vote_average}
                        </Card.Content>
                        <Card.Content extra key={index + "votes"}>
                          Votes: {movie.vote_count}
                        </Card.Content>
                      </Card>
                    )
                  })
                }
              </Card.Group>
          </div>
      )
  }
}

render(<Home/>,document.getElementById('root'))

export default Home
