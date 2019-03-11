import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home     from './components/Home'
import Navbar   from './components/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
