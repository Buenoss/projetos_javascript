import * as ActionTypes from './ActionTypes'

const defineSession = (value) => {
    return {
        type: ActionTypes.DEFINE_SESSION,
        payload:{
            value
        }
    }
}

export default {
    defineSession
}