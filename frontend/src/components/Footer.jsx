import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-center">
          <FontAwesomeIcon icon={faGithub} />
          <p><a href='https://github.com/EdEcheverry' target='_blank' rel="noopener noreferrer">Ed.Echeverry</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;