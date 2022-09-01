import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './css/index.css';
import App from './App';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';


axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.headers.common['Content-Type'] = 'application/json';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(    
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
