import React, { Component } from 'react';
import Navbar from './components/Navbar'
import {Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import AddComp from './components/AddComp'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/add' component={AddComp}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
