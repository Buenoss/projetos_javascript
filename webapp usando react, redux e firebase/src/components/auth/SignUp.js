import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// importando action de signup
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName : '',
        email    : '',
        password : ''
    }

    hadleSubmit = (e) => {
        e.preventDefault()
        this.props.signUp(this.state)
    }

    hadleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

  render() {

    const { auth, authError } = this.props

    if(auth.uid) return <Redirect to='/' />

    return (
      <div className='container'>
        <form onSubmit={this.hadleSubmit} className='white'>
            <h5 className='grey-text text-darken-3'>Sign Up</h5>

            <hr/>

            <div className='row'>

                <div className='input-field col s6'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' onChange={this.hadleChange}/>   
                </div>

                <div className='input-field col s6'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' onChange={this.hadleChange}/>   
                </div>

            </div>

            <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' onChange={this.hadleChange}/>   
            </div>

            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={this.hadleChange}/>   
            </div>

            <div className='red-text center'>
                {authError ? <p>{authError}</p>:null}
            </div>

            <div className='input-field'>
                <button className='btn btn-floating pink lighten-1 z-depth-0 right'><i className="large material-icons">send</i></button>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth      : state.firebase.auth,
        authError : state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp : (newUserData) => dispatch(signUp(newUserData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
