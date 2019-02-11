import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'

//importando componentes
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import CreateProject from './components/projects/CreateProject'
import SingIn from './components/auth/SignIn'
import SingUp from './components/auth/SignUp'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path='/create'      component={CreateProject} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/singin'      component={SingIn} />
            <Route path='/singup'      component={SingUp} />
            <Route path='/'            component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
