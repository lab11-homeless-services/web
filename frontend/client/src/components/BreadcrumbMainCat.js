import React from 'react'
import styled from 'styled-components'
import image6 from '../img/education.png'
import image1 from '../img/shelter.png'
import image3 from '../img/food.png'
import image2 from '../img/health-care.png'
import image7 from '../img/legal.png'
import image5 from '../img/outreach.png'
import image4 from '../img/hygiene.png'
import image8 from '../img/employment.png'

const StyledCont = styled.div`
    height: 100px;
    width: 100px;
    text-align: center;
    background-color: #414361;
    border-radius: 10px;
    border: 1px solid white;
    margin-left: 10px;
    box-shadow: 1px 2px 4px 2px #00000050;
    @media (max-width: 600px) {
    display: none;
    }
`
const StyledImage = styled.img`
    width: 60%;
    margin-top: 15%;
`

const StyledName = styled.p`
    color: white;
    font-size: .6rem;
    margin-top: 5%;
`

const StyledImageHealth = styled.img`
    width: 35%;
    margin-top: 15%;
`
const StyledNameHealth = styled.p`
    color: white;
    font-size: .6rem;
    margin-top: 5%;
`

const StyledImageHygiene = styled.img`
    width: 50%;
    margin-top: 15%;
`

const StyledImageOutreach = styled.img`
    width: 45%;
    margin-top: 15%;
`

const StyledImageLegal = styled.img`
    width: 40%;
    margin-top: 15%;
`


const StyledNameLegal = styled.p`
    color: white;
    font-size: .8rem;
    margin-top: 8%;
   
`

const BreadcrumbMainCat = props => {
    if (props.cat === 'shelters') {
        return (
            <StyledCont>
                <StyledImage src={image1} alt=""/>
                <StyledName>SHELTER</StyledName>
            </StyledCont>
        )
    }
    if (props.cat === "health_care") {
        return (
            <StyledCont>
                <StyledImageHealth src={image2} alt=""/>
                <StyledNameHealth>HEALTH CARE</StyledNameHealth>
            </StyledCont>
        ) 
    }
    if (props.cat === "food") {
        return (
            <StyledCont>
                <StyledImage src={image3} alt=""/>
                <StyledName>FOOD</StyledName>
            </StyledCont>
        ) 
    }
    if (props.cat === "hygiene") {
        return (
            <StyledCont>
                <StyledImageHygiene src={image4} alt=""/>
                <StyledName>HYGIENE</StyledName>
            </StyledCont>
        ) 
    }
    if (props.cat === "outreach_services") {
        return (
            <StyledCont>
                <StyledImageOutreach src={image5} alt=""/>
                <StyledName>OUTREACH SERVICES</StyledName>
            </StyledCont>
        ) 
    }
    if (props.cat === "education") {
        return (
            <StyledCont>
                <StyledImage src={image6} alt=""/>
                <StyledName>EDUCATION</StyledName>
            </StyledCont>
        ) 
    }
    if (props.cat === "legal_administrative") {
        return (
            <StyledCont>
                <StyledImageLegal src={image7} alt=""/>
                <StyledNameLegal>LEGAL</StyledNameLegal>
            </StyledCont>
        ) 
    }
    if (props.cat === "jobs") {
        return (
            <StyledCont>
                <StyledImage src={image8} alt=""/>
                <StyledName>JOBS</StyledName>
            </StyledCont>
        ) 
    }
}

export default BreadcrumbMainCat