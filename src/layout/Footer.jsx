import React from "react";
import {useNavigate} from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./AppLayout.style.css";

const Footer = () => {
  const navigate = useNavigate();

  const url = "https://github.com/bmbx08/react-group-project";
  const goToGit = () => {
    window.open(url);
  };

  const goToTc = () => {
    navigate("/terms&conditions");
  };
  const goToG = () => {
    navigate("/guide");
  };
  const goToPp = () => {
    navigate("/policyprivacy");
  };

  return (
    <div className="main-footer">
      <div className="footer-1">
        <div className="footer-logo">Skrrrr Wear.</div>
        <div>Ceo : React Team</div>
        <div>skrrrrwear@bu.ac.kr</div>
      </div>
      <div className="footer-2">
        <div>
          31065, 5F, 516, Baekseokdaehak-ro, Cheonan-si, Chungcheongnam-do,
          Republic of Korea
        </div>
      </div>
      <div className="footer-3">
        <div>Permit Number : 2024-CheonanDongnam-0020</div>
        <div>Business Number : 165-25-00692</div>
      </div>
      <div className="footer-4">
        <div className="footer-4_1">
          <div className="git-icon" onClick={goToGit}>
            <FaGithub />
          </div>
          <div className="cr-text">Copyright ⓒ React Team / Polaris</div>
        </div>
        <div className="footer-4_2">
          <div className="tc-text" onClick={goToTc}>
            Terms & Conditions
          </div>
          <div className="g-text" onClick={goToG}>
            Guide
          </div>
          <div className="pp-text" onClick={goToPp}>
            Policy Privacy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
