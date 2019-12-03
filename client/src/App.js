import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Detail from './components/Detail/Detail.jsx';

require('./styles/main.scss');

export default class App extends Component {
  render() {
    return (
      <div className="nav">
        <Router>
          <div>
            <h1><Link to="/" className="links">MOVIES</Link> </h1>
            <h2><Link to="/" className="links">SEARCH</Link> <Link to="/gallery" className="links">GALLERY</Link> </h2>
          </div>
        </Router>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />,
            <Route exact path='/gallery' component={Gallery} />,
            <Route exact path='/detail' component={Detail} />
          </Switch>
        </Router>
      </div>
    );
  }
}