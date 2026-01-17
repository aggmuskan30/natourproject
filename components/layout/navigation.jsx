"use client";
import React, { useState } from 'react';

const Navigation = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleMenu = () => {
    setIsChecked((prev) => !prev);
  };
  const handleNavClick = (e, id) => {
    e.preventDefault(); 
    setIsChecked(false); 

  
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 10);
  };

  const navItems = [
    { label: "About Natours", link: "#header" },       
    { label: "AI Customized Trip", link: "#section-about" }, 
    { label: "Your Benefits", link: "#section-features" },   
    { label: "Popular Tours", link: "#section-tours" },      
    { label: "Feedback", link: "#section-stories" }          
  ];

  return (
    <div className="navigation">
      
      <input 
        type="checkbox" 
        className="navigation__checkbox" 
        id="navi-toggle"
        checked={isChecked}
        onChange={() => {}} 
      />

      <label className="navigation__button" onClick={toggleMenu}>
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          {navItems.map((item, index) => (
            <li className="navigation__item" key={index}>
              <a 
                href={item.link}
                className="navigation__link" 
                onClick={(e) => handleNavClick(e, item.link)}
              >
                <span>0{index + 1}</span>{item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;