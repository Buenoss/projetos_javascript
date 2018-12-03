import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";

class Home extends Component {
  state = {
    posts: [],
    postsFiltrados: [],
    redirect: false,
    userId: ''
  }

    updateUser = (id) => {
      this.setState({
          userId  : id,
          redirect: true
      })
    }

    //componente ainda não foi implementado
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/update/" + this.state.userId} />
        }
    }

    componentDidMount(){
    axios.get('link')
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
  }

  searchName = (e) => {
      let nameSearched = e.target.value;
      this.setState({
          postsFiltrados: this.state.posts.filter(post => { return ((post.name.toLowerCase().includes(nameSearched.toLowerCase()) || post.email.toLowerCase().includes(nameSearched.toLowerCase()))? (post): (null))})
      });
  }

  deleteUser = (id) => {
      axios.delete('link'+id)
          .then(res => {
              if (res.statusText.toLowerCase() === "ok"){
                  axios.get('link')
                      .then(res => {
                          this.setState({
                              posts: res.data,
                              postsFiltrados: res.data
                          });
                      })
              }
          })
  }

  render(){
    const { posts } = this.state
    const { postsFiltrados } = this.state

    const postList = postsFiltrados.length ? (
        postsFiltrados.map(post => {
            return (
                <div className="post card" key={post._id}>
                    <div className="card-content">
                        <button className="right btn-floating waves-effect waves-light red" onClick={() => this.updateUser(post._id)}><i className="material-icons">create</i></button>
                        <button className="right btn-floating waves-effect waves-light red" onClick={() => this.deleteUser(post._id)}><i className="material-icons">delete</i></button>
                        <span className="card-title">{post.name}</span>
                        <span className="card-title">{post.email}</span>
                        {post.ramals.map(ramal => { return (<h5 key={ramal} >{ramal}</h5>)})}
                    </div>
                </div>
            )
        })
    ) : (
        posts.map(post => {
            return (
                <div className="post card" key={post._id}>
                    <div className="card-content">
                        <button className="right btn-floating waves-effect waves-light red" onClick={() => this.updateUser(post._id)}><i className="material-icons">create</i></button>
                        <button className="right btn-floating waves-effect waves-light red" onClick={() => this.deleteUser(post._id)}><i className="material-icons">delete</i></button>
                        <span className="card-title">{post.name}</span>
                        <span className="card-title">{post.email}</span>
                        {post.ramals.map(ramal => { return (<h5 key={ramal} >{ramal}</h5>)})}
                    </div>
                </div>
            )
        })
    );


    return (
      <div>
        <div className="container red darken-4">
            {this.renderRedirect()}
            <br/>
            <div className="input-field">
                <label htmlFor="Search">Procure Aqui</label>
                <input type="text" id="Search" onChange={this.searchName}/>
            </div>

            <br/>
            <div className="content">
                {postList}
            </div>
        </div>
      </div>
    )
  }
}

export default Home