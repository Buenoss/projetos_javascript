import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import SendButton from './SendButton'

class AddComp extends Component {
    state = {
        email: "",
        nome : "",
        ramals: [],
        redirect: false
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    hadleEmailChange = (e) =>{
        this.setState({
            email : e.target.value
        })
    };

    hadleRamalChange = (e) =>{
        this.setState({
            ramals : [...e.target.value.split(' ')]
        })
    };

    hadleNameChange = (e) =>{
        this.setState({
            nome : e.target.value
        })
    };

    hadleSubmit = (e) =>{
        e.preventDefault();
         let data = {
                name:this.state.nome,
             email: this.state.email,
             ramals: this.state.ramals
         };
         axios.post('link', data)
             .then(response => {
                 if(response.statusText.toLowerCase() === 'ok' ){
                     this.setState({
                         redirect: true
                     })
                 }
             });
    };

    render(){
        return(
            <div className="red darken-4">
                {this.renderRedirect()}
                <br/>
                <div className="row">
                    <div className="col s12 m7">
                        <div className="card center">
                            <form onSubmit={this.hadleSubmit}>
                                <div className="card-content">
                                    <h4>Formulário de inscrição</h4>
                                    <div className="input-field">
                                        <label htmlFor="Name">Name</label>
                                        <input className="validate" id="Name" type="text" name="Name" onChange={this.hadleNameChange}/>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="Email">Email</label>
                                        <input className="validate" id="Email" type="text" name="email" onChange={this.hadleEmailChange}/>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="Ramal">Ramal</label>
                                        <input  className="validate" id="Ramal" type="text" name="Ramal" onChange={this.hadleRamalChange} />
                                    </div>
                                    <br/>
                                    <SendButton color={"red"}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddComp