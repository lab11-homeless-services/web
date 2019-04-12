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
`;

const FooterText = styled.p`
  margin-right: 50px;
  padding: 5px;
`;
const Footer = () => {
  return (
    <FooterBar>
      <FooterText>
        <i class="fas fa-book-reader" /> About Us
      </FooterText>
      <FooterText>
        <i class="fas fa-user-friends" /> Volunteer
      </FooterText>
      <FooterText>
        <i class="far fa-handshake" /> Our Partners
      </FooterText>
      <FooterText>
        <i class="far fa-envelope" /> Contact Us
      </FooterText>
    </FooterBar>
  );
};

export default Footer;
