import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// importando redux actions
import { signIn } from '../../store/actions/authActions'

class SignIn extends Component {
    state = {
        email    : '',
        password : ''
    }

    hadleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    hadleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

  render() {
    
    const { authError, auth } = this.props

    if(auth.uid) return <Redirect to='/' />

    return (
      <div className='container'>
        <form onSubmit={this.hadleSubmit} className='white'>
            <h5 className='grey-text text-darken-3'>Sign In</h5>
            <hr/>
            <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' onChange={this.hadleChange}/>   
            </div>

            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' onChange={this.hadleChange}/>   
            </div>
            
            <div className='red-text center'>
                { authError ? <p>{ authError }</p> : null }
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
        authError : state.auth.authError,
        auth      : state.firebase.auth   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn : (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
