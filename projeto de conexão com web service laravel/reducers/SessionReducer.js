import * as ActionTypes from './../actions/ActionTypes'

export default (state = {value: false}, action) => {
    switch (action.type) {
        case ActionTypes.DEFINE_SESSION:
            return Object.assign({}, state, {value : action.payload.value} )
        break;
        default:
            return state
    }
}