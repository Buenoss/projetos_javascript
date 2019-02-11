const initState = {
    authError : null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ACCESS':
            return {
                ...state,
                authError: null
            }

        case 'LOGIN_ERROR':
            return {
                ...state, 
                authError : 'Login Failed!'
            }

        case 'SIGNOUT_SUCCESS':
            return state

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError : null
            }

        case 'SIGNUP_FAILED':
            return {
                ...state,
                authError : action.erro.message
            }

        default:
            return state
    }
}

export default authReducer