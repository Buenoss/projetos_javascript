import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'

//importando documentos
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'

class Dashboard extends Component {
    render(){

        const { projects, auth, notifications } = this.props 

        if(!auth.uid) return <Redirect to='/singin' />
        
        return(
            <div className='dashboard container'>
                <div className='row'>
                    <div className='col s-12 m6'>
                        <ProjectList projects = {projects}/>
                    </div>
                    <div className='col s-12 m5 offset-m1'>
                        <Notifications notifications = {notifications} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects      : state.firestore.ordered.projects,
        notifications : state.firestore.ordered.notifications,
        auth          : state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'projects',      limit : 5, orderBy: ['createdAt', 'desc'] },
        { collection : 'notifications', limit : 4, orderBy: ['time', 'desc'] }
    ])
)(Dashboard)