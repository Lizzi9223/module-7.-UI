import React from 'react';

import Certificates from './Certificates'

import './css/MainPage.css';

const MainPage = () => (
  <div class="main-page">    
    <div className="error-message">
      <div className="status">
        <div className="image"><img src={require('./images/remove.png')} /></div>
        <div>Error message</div>
      </div>
      <div className="close"><img src={require('./images/close.png')} /></div>
    </div>

    <div className="search">
      <input type="text" placeholder="Search..."/>
      <input type="submit" value="Got" />
    </div>

    <Certificates />
  </div>
);

export default MainPage;