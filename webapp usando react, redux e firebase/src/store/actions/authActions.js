export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({ type : 'LOGIN_ACCESS' })
        }).catch((erro)=>{
            dispatch({ type : 'LOGIN_ERROR', erro })
        })
    }
}

export const signOut = () => {
    return(dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signOut().then(()=>{
            dispatch({ type : 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUserData) => {
    return(dispatch, getState, { getFirebase , getFirestore}) => {
        const firebase  = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUserData.email,
            newUserData.password
        ).then((response)=>{
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUserData.firstName,
                lastName : newUserData.lastName,
                initials : newUserData.firstName[0].toUpperCase() + newUserData.lastName[0].toUpperCase()
            })
        }).then(()=>{
            dispatch({ type : 'SIGNUP_SUCCESS' })
        }).catch((erro)=>{
            dispatch({ type: 'SIGNUP_FAILED', erro })
        })
    }
}
