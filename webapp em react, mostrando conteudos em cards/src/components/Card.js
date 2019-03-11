import React from 'react'

const Card = (props) => {

    return(
        <div className='col l4 m8 s12' >
            <div className="post card card-content z-depth-2 center">
                <span className='card-content-type' >Aba: {props.post.type}</span>
                <div className="card-content">
                    <span className="card-title">{props.post.title}</span>
                </div>
                <a className='btn red darken-2 card-button z-depth-2' href={props.post.url} target='about:blank' >
                    Ir para o
                    {
                        (props.post.url.includes('youtube'))?
                        ' Youtube'
                        : (props.post.url.includes('facebook'))?
                            ' Facebook'
                            : (props.post.url.includes('twitter'))?
                                ' Twitter'
                                : (props.post.url.includes('iesb'))?
                                ' Iesb'
                                    :' Site'
                    }
                    <i className="material-icons dp48">arrow_forward</i>
                </a>
            </div>
        </div>
    )
}

export default Card