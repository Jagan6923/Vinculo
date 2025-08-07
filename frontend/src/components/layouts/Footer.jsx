import React from "react";
import "../cssfiles/footerDesktop.css";
import paytmIcon from "../footer images/paytm.svg";
import gpayIcon from "../footer images/google-pay.svg";
import phonepeIcon from "../footer images/phonepe.svg";
import codIcon from "../footer images/cod.svg";
import amzIcon from "../footer images/amazon-pay.svg";
import facebook from "../footer images/facebook.svg";
import whatsapp from "../footer images/whatsapp.svg";
import twitter from "../footer images/twitter.svg";
import instagram from "../footer images/instagram.svg";

import "./footer.css";

import { Link } from "react-router-dom";


import { MdHome, MdShoppingCart, MdAssignment, MdPerson } from 'react-icons/md';
import {BsThreeDots} from 'react-icons/bs'


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="desktop-footer">
        <div className="footer-container">
          <div className="footer-links">
            <h3>COMPANY</h3>
            <div className="company-columns">
              <div className="company-column">
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/return-exchange-policy">Return/Exchange Policy</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/shipping-policy">Shipping Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="company-column">
                <ul>
                  <li>
                    <Link to="/terms-of-service">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">Refund Policy</Link>
                  </li>
                  <li>
                    <Link to="/track-order">Track Order</Link>
                  </li>
                  <li>
                    <Link to="/faq">Frequently asked questions</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-about">
            <h3>About Us</h3>
            <div className="about-us">
              <p style={{ textAlign: "justify" }}>
                In our company, we are selling first-quality t-shirts for Boys,
                Girls and Infants.
              </p>
            </div>
            <div className="footer-contact">
              <h3>Contact us</h3>
              <p>SRI SHANMUGAVEL MILLS PRIVATE LIMITED, GARMENT DIVISION, 
                SF NO.1816, VEDASANDUR ROAD, VITTALNAYAKKANPATTI, AGARAM VILLAGE, 
                DINDIGUL DISTRICT, AGARAM VILLAGE, Dindigul, Tamil Nadu, India, 624709</p>
              <p>Phone:91+ 9150080300</p>
              <div className="footer-social">
                <a href="https://www.instagram.com/the_vinculo_shop/">
                  <img src={instagram} alt="Instagram" />
                </a>
                <a href="https://wa.me/+919150086952?text=Hi">
                  <img src={whatsapp} alt="WhatsApp" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61562736158294">
                  <img src={facebook} alt="Facebook" />
                </a>
                <a href="https://twitter.com">
                  <img src={twitter} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="secure-payment-app">
          <div className="secure-payment-text">100% Secure Payment</div>
          <div className="payment-icons">
            <img src={paytmIcon} alt="Paytm" />
            <img src={gpayIcon} alt="GPay" />
            <img src={phonepeIcon} alt="PhonePe" />
            <img src={amzIcon} alt="Amazon Pay" />
            <img src={codIcon} alt="Cash on Delivery" />
          </div>
        </div>

        <div className="copyright">
          <p>&copy; {currentYear} SRI SHANMUGAVEL MILLS PRIVATE LIMITED. All rights reserved.</p>
        </div>
      </div>

      <div className="mobile-footer">
        <ul className="navigation">
          <li>
            <Link to="/">
              <MdHome size={24} style={{ color: "#2a292b" }} />
              <div style={{fontSize:"12px"}}>Home</div>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <MdAssignment size={24} style={{ color: "#2a292b" }} />
              <div style={{fontSize:"12px"}}>Orders</div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <MdShoppingCart size={24} style={{ color: "#2a292b" }} />
              <div style={{fontSize:"12px"}}>Cart</div>
            </Link>
          </li>
          <li>
            <Link to="/myprofile">
              <MdPerson size={24} style={{ color: "#2a292b" }} />
              <div style={{fontSize:"12px"}}>Profile</div>
            </Link>
          </li>
          <li>
            <Link to="/others">
              <BsThreeDots size={24} style={{ color: "#2a292b" }} />
              <div style={{fontSize:"12px"}}>Others</div>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
