import React from "react";
import styled from "styled-components";

const FooterBar = styled.div`
display:flex
color: white;
background-color: #414361;
width: 100%;
height: 60px;
justify-content: flex-end;
align-items: center;
position: fixed;
bottom: 0;
`;

const FooterText = styled.p`
  margin-right: 50px;
  padding: 5px;
  font-size: 13px;
`;
const Footer = () => {
  return (
    <FooterBar>
      <FooterText>
        <i class="fas fa-book-reader" /> ABOUT US
      </FooterText>
      <FooterText>
        <i class="fas fa-user-friends" /> VOLUNTEER
      </FooterText>
      <FooterText>
        <i class="far fa-handshake" /> OUR PARTNERS
      </FooterText>
      <FooterText>
        <i class="far fa-envelope" /> CONTACT US
      </FooterText>
    </FooterBar>
  );
};

export default Footer;
