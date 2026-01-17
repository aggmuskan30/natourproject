import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
  
        <img src="/img/logo-green-2x.png" alt="full logo" className="footer__logo" />
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              <li className="footer__item"><a href="#" className="footer__link">Company</a></li>
              <li className="footer__item"><a href="#" className="footer__link">Contact Us</a></li>
              <li className="footer__item"><a href="#" className="footer__link">Carrers</a></li>
              <li className="footer__item"><a href="#" className="footer__link">Privacy policy</a></li>
              <li className="footer__item"><a href="#" className="footer__link">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="col-1-of-2">
          <p className="footer__copyright">
            Built by <a href="#" className="footer__link">Muskan Aggarwal</a> for her online course portfolio <a href="#" className="footer__link">Advance CSS and SASS</a>.
            Copyright &copy; by Jonas Schmedtmann. All rights for the designs reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;