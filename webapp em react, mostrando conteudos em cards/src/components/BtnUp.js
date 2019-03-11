import React, {Component} from 'react';
import $ from 'jquery';

class BtnUp extends Component {

    click = () => {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    }

    render(){
        return (
            <button className="btn-floating btn-large waves-effect waves-light btn-upward" 
                    onClick={this.click}>
                <i className="material-icons dp48">arrow_upward</i>
            </button>
        )
    }
}

export default BtnUp;