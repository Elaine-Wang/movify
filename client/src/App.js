import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Detail from './components/Detail/Detail.jsx';
import Create from './components/Create/Create.jsx';
import Basic from './components/Basic/Basic.jsx';

require('./styles/main.scss');

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="nav">
        <Router>
          <div className="splitNav">
            <div>
              <h1><Link to="/" className="links">MOVIFY</Link> </h1>
              <h2>
                <Link to={{
                  pathname: '/',
                  state: {
                    username: this.state.username
                  }
                }} className="links">SEARCH</Link>
                <Link to="/gallery" className="links">GALLERY</Link>
                <Link to="/create" className="links">CREATE-UPDATE-DELETE</Link>
                <Link to="/basic" className="links">BASIC-QUERIES</Link>
              </h2>
            </div>
            <div>
              <Form.Input placeholder='Username' name="username" onChange={this.handleChange}></Form.Input>
            </div>
          </div>
        </Router>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />,
            <Route exact path='/gallery' component={Gallery} />,
            <Route exact path='/detail' component={Detail} />
            <Route exact path='/create' component={Create} />
            <Route exact path='/basic' component={Basic} />
          </Switch>
        </Router>
      </div>
    );
  }
}