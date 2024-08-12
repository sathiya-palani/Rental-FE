import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import store from './store.js';
import {Provider} from "react-redux";



 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>
  //  </React.StrictMode>
    );
   
