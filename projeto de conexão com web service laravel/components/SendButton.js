import React from "react";

const SendButton = (buttonColor) => {
    let color = "btn btn-floating waves-effect waves-light right " + buttonColor.color

    return(
        <button className={color} type="submit" name="action">
            <i className="material-icons right">send</i>
        </button>
    )
}

export default SendButton