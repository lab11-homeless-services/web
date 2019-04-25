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
bottom: 0;
position: fixed;

@media (max-width: 600px) {
    display: none;
}

@media(max-width: 1024px) {
  margin-top: 5%;
}
`;

const FooterText = styled.p`
  margin-right: 50px;
  padding: 5px;
  font-size: 0.7rem;
  font-weight: lighter;
  letter-spacing: 2px;

  i {
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
const Footer = () => {
  return (
    <FooterBar>
      {/* <FooterText>
        <i class="fas fa-book-reader fa-lg" /> ABOUT US
      </FooterText>
      <FooterText>
        <i class="fas fa-user-friends fa-lg" /> VOLUNTEER
      </FooterText>
      <FooterText>
        <i class="far fa-handshake fa-lg" /> OUR PARTNERS
      </FooterText>
      <FooterText>
        <i class="far fa-envelope fa-lg" /> CONTACT US
      </FooterText> */}
    </FooterBar>
  );
};

export default Footer;

// import React from "react";
// import styled from "styled-components";

// const FooterBar = styled.div`
// display:flex
// color: white;
// background-color: #414361;
// width: 100%;
// height: 60px;
// justify-content: flex-end;
// align-items: center;
// bottom: 0;
// position: fixed;

// @media (max-width: 600px) {
//   display: none;
// }

// @media(max-width: 1024px) {
//   position: relative;
//   margin-top: 5%;
// }
// `;

// const FooterText = styled.div`
//   border: 1px solid red;
//   margin-right: 50px;
//   padding: 5px;
//   font-size: .75rem;
//   letter-spacing: 2px;
//   display: flex;
//   width: 150px;

//   p {
//     margin-left: 10%
//   }

//   @media(max-width: 600px) {
//     display: none;
//   }
// `;
// const Footer = () => {
//   return (
//     <FooterBar>
//       <FooterText>
//         <i class="fas fa-book-reader fa-lg" />
//         <p>ABOUT US</p>
//       </FooterText>
//       <FooterText>
//         <i class="fas fa-user-friends fa-lg" />
//         <p>VOLUNTEER</p>
//       </FooterText>
//       <FooterText>
//         <i class="far fa-handshake fa-lg" />
//         <p>OUR PARTNERS</p>
//       </FooterText>
//       <FooterText>
//         <i class="far fa-envelope fa-lg" />
//         <p>CONTACT US</p>
//       </FooterText>
//     </FooterBar>
//   );
// };

// export default Footer;
