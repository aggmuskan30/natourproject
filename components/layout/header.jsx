import React from 'react';

const Header = ({ onOpenAuth }) => {
  return (
    <header className="header" id ="header">
       <div className="header__logo-box">
          <img src="/img/logo-white.png" alt="Logo" className="header__logo" />
       </div>
       
       <div className="header__cover-page"> 
          <h1 className="heading-primary">
            <p className="heading-primary--main">Outdoors</p>
            <p className="heading-primary--sub">is where life happens</p>
          </h1>
          
         
          <button onClick={onOpenAuth} className="btn btn--white btn--animated">
           Discover Our Tours
          </button>
       </div>
    </header>
  );
}

export default Header;