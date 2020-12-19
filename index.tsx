import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

//css
import './src/static/css/fixer.css'
import './src/static/css/home.css'


import { persistStore } from 'redux-persist'
import store from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './src/App'

const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.querySelector('#root')
)

