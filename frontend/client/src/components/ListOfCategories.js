import React from "react";
import useFetch from "../functions/useFetch";
import { useStateValue } from "../state/state";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const ListOfCatsContainer = styled.div`
  width: 37%;
  border: 1px solid red;
`;

const CategoryButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 10%;
`;

const CategoryButton = styled.div`
  width: 100px;
  height: 65px;
  background-color: #4A4A4A;
  margin: 10px 10px 10px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const CategoryButtonsHeader = styled.h2`
  margin-left: 12%;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10%;
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
                <Link to={`/home/${category}`}>{category.toUpperCase()}</Link>
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
