import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  state = {
    email: '',
    password: ''
  }

  hadleEmail = (e) =>{
    e.preventDefault();
    this.setState({
      email : e.target.value
    });
  }
  
  hadlePassword = (e) =>{
    e.preventDefault();
    this.setState({
      password : e.target.value
    });
  }

  formSubmiting = (e) =>{
    e.preventDefault();
    var data = {
      client_id : 2,
      client_secret : 'KdeX0UGPqu0o1OSMx6dW8DCa1u2tDlc4KwrjgiZq',
      grant_type: 'password',
      username: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:8000/oauth/token', data)
          .then(response => {
                  console.log(response.data);
          });
  }

  render(){
    
    // http://localhost:8000/oauth/token

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1 center">
              <div className="card-content white-text">
                <span className="card-title">Login</span>
                <form onSubmit={this.formSubmiting} >
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="email" type="email" className="validate" onChange={this.hadleEmail} />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="password" type="password" className="validate" onChange={this.hadlePassword} />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home