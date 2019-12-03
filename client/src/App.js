import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      original_language: '',
      overview: ''
    }
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate(event) {
    event.preventDefault()
    var data = {
      title: this.state.title,
      original_language: this.state.original_language,
      overview: this.state.overview
    }
    fetch("/movie/movie_create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      console.log(data)
    }).catch(function (err) {
      console.log(err)
    });
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})

  render() {
    return (
      <div className="container register-form">
        <Form onSubmit={this.handleCreate} method="POST">
          <Form.Input placeholder='Title' name="title" onChange={this.handleChange}></Form.Input>
          <Form.Input placeholder='Language' name="original_language" onChange={this.handleChange}></Form.Input>
          <Form.Input placeholder='Overview' name="overview" onChange={this.handleChange}></Form.Input>
          <Form.Button>Create</Form.Button>
        </Form>
      </div>
    );
  }
}