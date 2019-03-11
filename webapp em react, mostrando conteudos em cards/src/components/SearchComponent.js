import React, {Component} from 'react';
import $ from 'jquery';

class SearchComponent extends Component{
    
    hadleSubmit = (e) => {
        e.preventDefault();
        $('#Search').blur();
    }
    
    render(){
        return(
            <form onSubmit={this.hadleSubmit}>
                <div className="input-field">
                    <label htmlFor="Search"><i className="material-icons dp48">search</i>Procure Aqui</label>
                    <input type="text" id="Search" onChange={this.props.searchName}/>
                </div>
            </form>
        )
    }
}

export default SearchComponent;