import React from 'react'
import image6 from '../img/education.png'
import image1 from '../img/shelter.png'
import image3 from '../img/food.png'
import image2 from '../img/health-care.png'
import image7 from '../img/legal.png'
import image5 from '../img/outreach.png'
import image4 from '../img/hygiene.png'
import image8 from '../img/employment.png'

const BreadcrumbMainCat = props => {
    if (props.cat === 'shelters') {
        return (
            <div>
                <img src={image1} alt=""/>
            </div>
        )
    }
    if (props.cat === "health_care") {
        return (
            <div>
                <img src={image2} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "food") {
        return (
            <div>
                <img src={image3} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "hygiene") {
        return (
            <div>
                <img src={image4} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "outreach_services") {
        return (
            <div>
                <img src={image5} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "education") {
        return (
            <div>
                <img src={image6} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "legal_administrative") {
        return (
            <div>
                <img src={image7} alt=""/>
            </div>
        ) 
    }
    if (props.cat === "jobs") {
        return (
            <div>
                <img src={image8} alt=""/>
            </div>
        ) 
    }
}

export default BreadcrumbMainCat