import React, { Component } from 'react';
import { Divider, Form, Icon } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Basic.scss'

export default class Create extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  handleBasic1(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic1';
    axios.post(url)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  handleBasic2(e) {
    e.preventDefault();
    var url = 'https://aqueous-retreat-92283.herokuapp.com/basic1';
    axios.post(url)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className="Create">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}

        <div className="centerMeBasic">
          <Form onSubmit={this.handleBasic1} method="POST">
            <h2>WHAT THIS QUERY DOES</h2>
            <Form.Button>Create</Form.Button>
          </Form>

          <Divider vertical><Icon inverted circular name="video" /></Divider>

          <Form onSubmit={this.handleBasic2} method="POST">
            <h2>WHAT THIS QUERY DOES</h2>
            <Form.Button>Update</Form.Button>
          </Form>
        </div>
      </div>
    );
  }
}