import React, { Component } from 'react'
import axios from 'axios'

import Card from './Card'
import BtnUp from './BtnUp'
import SearchComponent from './SearchComponent'

import searchRules from './../functions/searchRules'

class Home extends Component {

    state = {
        posts : [
            {
                title: 'isso é um exemplo de objeto!',
                type: 'Exemplo',
                url:'https://www.google.com'
            }
        ],
        postsFiltrados : [],
        searchContent : ''
    }

    componentDidMount(){
        // aqui vamos puxar do banco
        let s    = this.state

        // essa url não pode ser acessada por pessoas de fora, use outra url como exemplo
        axios
        .get('http://homol.iesb.br/api/v1/crawler/videos')
        .then((res2)=>{
            s.posts = [...res2.data]
        })
        .then(()=>this.setState(s))
    }

    searchName = (e) => {
        let nameSearched = e.target.value;

        this.setState({
            searchContent : e.target.value,
            postsFiltrados: this.state.posts.filter(post => { 
                return ( 
                    searchRules(post,nameSearched)? (post) : (null) 
                )
            })
        });
    }

    render(){
        const { posts, postsFiltrados } = this.state

        const postList = postsFiltrados.length ? (
            postsFiltrados.map((post, index) => {
                return (
                    <Card post={post} key={index} />               
                )
            })
        ) : (
            posts.map((post, index) => {
                return (
                    <Card post={post} key={index} />               
                )
            })
        );

        return (
            <div>
                <div className="container">
                    <br/>
                    <br/>
                    <SearchComponent searchName={this.searchName} />
                    <br/>
                    <div className="content row">
                        {
                            // verifica se nenhum post foi encontrado
                            (this.state.searchContent!=='' && this.state.postsFiltrados.length===0)?
                            <h1 className='not-matching' >Nenhum Resultado Encontrado!</h1> 
                            : postList                        
                        }
                    </div>
                    <BtnUp/>
                </div>
            </div>
        )
    } 
}

export default Home