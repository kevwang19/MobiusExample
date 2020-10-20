import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, NavLink, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Main from './Components/Main.js';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route exact path="/" component={Main}/>
          <Redirect from="*" to="/" />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
