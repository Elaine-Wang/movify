import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Basic.scss'

export default class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      languages: [],
      genres: []
    }
  }

  componentDidMount() {
  }

  handleBasic1(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic1';
    axios.post(url)
      .then(response => response.json())
      .then(languages => this.setState({ languages }))
      .catch(e => console.log(e))
  }

  handleBasic2(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic2';
    axios.post(url)
      .then(response => response.json())
      .then(genres => this.setState({ genres }))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className="Create">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}

        <div className="centerMe">
          <Form onSubmit={this.handleBasic1} method="POST">
            <h2 className="basicQuery">Languages with the most movies nominated for an Oscar</h2>
            <Form.Button>Create</Form.Button><ul>
              {this.state.languages.map(language =>
                <li>{language}</li>
              )}
            </ul>
          </Form>

          <Divider horizontal><Icon inverted circular name="video" /></Divider>

          <Form onSubmit={this.handleBasic2} method="POST">
            <h2 className="basicQuery">Genres with the most movies that won an Oscar</h2>
            <Form.Button>Update</Form.Button>
            <ul>
              {this.state.genres.map(genre =>
                <li>{genre}</li>
              )}
            </ul>
          </Form>
        </div>
      </div>
    );
  }
}