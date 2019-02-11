// importação básica do react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// importando pacotes do redux e do firebase
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore,     getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase  } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

// importando reducer
import rootReducer from './store/reducers/rootReducer'

const appConfig = {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady : true
}

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, appConfig)
    )
);

store.firebaseAuthIsReady.then(()=>{
    ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
    serviceWorker.unregister(); 
})
