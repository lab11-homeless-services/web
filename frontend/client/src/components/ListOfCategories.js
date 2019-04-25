//React related imports
import React from "react";
import { NavLink } from "react-router-dom";

//Importing custom hook
import useFetch from "../functions/useFetch";

//Gaining access to state
import { useStateValue } from "../state/state";

//Styling
import styled from "styled-components";

//Images
import image1 from "../img/shelter.png";
import image2 from "../img/health-care.png";
import image3 from "../img/food.png";
import image4 from "../img/hygiene.png";
import image5 from "../img/outreach.png";
import image6 from "../img/education.png";
import image7 from "../img/legal.png";
import image8 from "../img/employment.png";

const ListOfCatsContainer = styled.div`
  width: 43%;
  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 5%;
  }
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 25%;
  @media (max-width: 1024px) {
    margin-bottom: 0;
    justify-content: center;
  }
`;

const CategoryButton = styled.div`
  width: 130px;
  height: 85px;
  background-color: #4a4a4a;
  margin: 3% 3% 3% 4%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  border: 1px solid white;
  box-shadow: 0px 1px 3px 1px #ccc;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 1px 2px 4px 2px #00000050;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }

  p {
    color: white;
    margin-top: 7%;
  }
`;

const CategoryButtonsHeader = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin: 19% 0 4% 4%;
  @media (max-width: 1024px) {
    margin: 0;
    margin-top: 5%;
    margin-bottom: 3%;
    text-align: center;
  }
`;

const StyledImage = styled.img`
  width: 40px;
`;

//Creating an array of the imported images
const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const ListOfCats = () => {
  //Gains access to reducers and state
  const [{ spanish }] = useStateValue();

  // Bringing in both english and spanish names for categories
  const categoriesEng = useFetch(
    "https://empact-e511a.firebaseio.com/categories.json"
  );
  const categoriesSpa = useFetch(
    "https://empact-e511a.firebaseio.com/categories_espanol.json"
  );


  // Not currently being used within the app but a good demonstration of how to
  // use global state for language

  //Determining if the spanish state is true
  if (spanish.spanish === true) {

    //If true, create a variable and set it to the array of categories
    const spanishCats = categoriesSpa.category_name;

    if (spanishCats !== undefined) {
      //If the array is not undefined, map over each one and make them all uppercase and in their own div
      return (
        <div>
          {categoriesSpa.category_name.map((category, index) => (
            <div key={index}>{category.toUpperCase()}</div>
          ))}
        </div>
      );
    }
    return <div>Loading...</div>;
  } else {
    // If language is english, set a variable cats to the english array of category names
    const cats = categoriesEng.category_name;
    if (cats !== undefined) {
      // Set an ID on them that can be called for an index position of the images array
      let catID = -1;
      return (
        <ListOfCatsContainer>
          <CategoryButtonsHeader>
            WHAT DO YOU NEED HELP WITH?
          </CategoryButtonsHeader>
          <CategoryButtonContainer>
            {categoriesEng.category_name.map((category, index) => {
              for (let i = 0; i < images.length; i++) {
                // Map over the english categories and incrementing the catID which is then used
                // with bracket notation to determine the index positon relevant for the correct image
                // also use regex to replace the incoming underscore with a space, and make it capital letters
                catID++;
                return (
                  <CategoryButton>
                    <NavLink key={index} to={`/home/${category}`}>
                      <StyledImage src={images[catID]} alt={`${category}`} />
                      <p>{category.replace(/_/g, " ").toUpperCase()}</p>
                    </NavLink>
                  </CategoryButton>
                );
              }
            })}
          </CategoryButtonContainer>
        </ListOfCatsContainer>
      );
    }
    return <div>Loading...</div>;
  }
};

export default ListOfCats;
