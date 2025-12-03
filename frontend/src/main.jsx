import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx';
import {Provider} from "react-redux";
import {store} from "./app/store.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <BrowserRouter>
   <ToastContainer position="top-right" autoClose={2000}/>
   <App/>
   </BrowserRouter>
  </Provider>
  
)