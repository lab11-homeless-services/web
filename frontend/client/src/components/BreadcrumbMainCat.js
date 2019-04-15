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
    width: 40%;
    margin-left: 22%;
    display: flex;
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
            <div>
                <StyledImage src={image1} alt=""/>
                <StyledName>SHELTER</StyledName>
            </div>
        )
    }
    if (props.cat === "health_care") {
        return (
            <div>
                <StyledImageHealth src={image2} alt=""/>
                <StyledNameHealth>HEALTH CARE</StyledNameHealth>
            </div>
        ) 
    }
    if (props.cat === "food") {
        return (
            <div>
                <StyledImage src={image3} alt=""/>
                <StyledName>FOOD</StyledName>
            </div>
        ) 
    }
    if (props.cat === "hygiene") {
        return (
            <div>
                <StyledImageHygiene src={image4} alt=""/>
                <StyledName>HYGIENE</StyledName>
            </div>
        ) 
    }
    if (props.cat === "outreach_services") {
        return (
            <div>
                <StyledImageOutreach src={image5} alt=""/>
                <StyledName>OUTREACH SERVICES</StyledName>
            </div>
        ) 
    }
    if (props.cat === "education") {
        return (
            <div>
                <StyledImage src={image6} alt=""/>
                <StyledName>EDUCATION</StyledName>
            </div>
        ) 
    }
    if (props.cat === "legal_administrative") {
        return (
            <div>
                <StyledImageLegal src={image7} alt=""/>
                <StyledNameLegal>LEGAL</StyledNameLegal>
            </div>
        ) 
    }
    if (props.cat === "jobs") {
        return (
            <div>
                <StyledImage src={image8} alt=""/>
                <StyledName>JOBS</StyledName>
            </div>
        ) 
    }
}

export default BreadcrumbMainCat