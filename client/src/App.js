import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import 'semantic-ui-css/semantic.min.css';

// import Home from './components/Home/Home.jsx';
// import Gallery from './components/Gallery/Gallery.jsx';
// import Detail from './components/Detail/Detail.jsx';

//require('./styles/main.scss');

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>HELLO</h1>
        {/* <Router>
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
        </Router> */}
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import { Form } from 'semantic-ui-react'
// import axios from 'axios'

// export default class Create extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       title: '',
//       original_language: '',
//       overview: '',
//     }
//     this.handleCreate = this.handleCreate.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//   }

//   componentDidMount() {
//   }

//   handleCreate(e) {
//     e.preventDefault();
//     var data = {
//       title: this.state.title,
//       original_language: this.state.original_language,
//       overview: this.state.overview
//     }
//     var url = 'https://aqueous-retreat-92283.herokuapp.com/movie_create';
//     axios.post(url, data)
//       .then(response => console.log(response))
//       .catch(e => console.log(e))
//   }

//   handleChange(e) {
//     this.setState({ [e.target.name] : e.target.value });
//  }
//   render() {
//     return (
//       <div className="Create">
//         {/* <h1>Users</h1>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}</div>
//         )} */}

//         <div className="container register-form">
//           <Form onSubmit={this.handleCreate} method="POST">
//             <Form.Input placeholder='Title' name="title" onChange={this.handleChange}></Form.Input>
//             <Form.Input placeholder='Language' name="original_language" onChange={this.handleChange}></Form.Input>
//             <Form.Input placeholder='Overview' name="overview" onChange={this.handleChange}></Form.Input>
//             <Form.Button>Create</Form.Button>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }