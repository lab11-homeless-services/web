import React from "react";
import useFetch from "../functions/useFetch";
import { useStateValue } from "../state/state";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const ListOfCatsContainer = styled.div`
  width: 37%;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 25%;
`;

const CategoryButton = styled.div`
  width: 140px;
  height: 90px;
  background-color: #4A4A4A;
  margin: 4% 4% 5px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  border: 1px solid white;
  box-shadow: 1px 2px 4px 2px #00000050;
`;

const CategoryButtonsHeader = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 19% 0 5% 2%;
`;

const ListOfCats = () => {
  //Gains access to reducers and state
  const [{ spanish }] = useStateValue();

  const categoriesEng = useFetch(
    "https://empact-e511a.firebaseio.com/categories.json"
  );
  const categoriesSpa = useFetch(
    "https://empact-e511a.firebaseio.com/categories_espanol.json"
  );

  if (spanish.spanish === true) {
    const test = categoriesSpa.category_name;
    if (test !== undefined) {
      return (
        <div>
          {categoriesSpa.category_name.map(category => (
            <div>{category.toUpperCase()}</div>
          ))}
        </div>
      );
    }
    return <div>Loading...</div>;
  } else {
    const test = categoriesEng.category_name;
    if (test !== undefined) {
      return (
        <ListOfCatsContainer>
          <CategoryButtonsHeader>WHAT DO YOU NEED HELP WITH?</CategoryButtonsHeader>
          <CategoryButtonContainer>
            {categoriesEng.category_name.map(category => (
              <CategoryButton>
                <NavLink to={`/home/${category}`}>{category.toUpperCase()}</NavLink>
              </CategoryButton>
            ))}
          </CategoryButtonContainer>
        </ListOfCatsContainer>
      );
    }
    return <div>Loading...</div>;
  }
};

export default ListOfCats;
