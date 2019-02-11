import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// importando reducer
import { createProject } from '../../store/actions/projectActions'

class CreateProject extends Component {
    state = {
        title    : '',
        content  : ''
    }

    hadleSubmit = (e) => {
        e.preventDefault()
        this.props.createProject(this.state)
        this.props.history.push('/')
    }

    hadleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

  render() {

    const { auth } = this.props

    if(!auth.uid) return <Redirect to ='/singin'/>

    return (
      <div className='container'>
        <form onSubmit={this.hadleSubmit} className='white'>
            <h5 className='grey-text text-darken-3'>Create Project</h5>
            <hr/>
            <div className='input-field'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' onChange={this.hadleChange}/>   
            </div>

            <div className='input-field'>
                <label htmlFor='content'>Content</label>
                <textarea name='content' id='content' className='materialize-textarea'  onChange={this.hadleChange}></textarea>   
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
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject : (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
