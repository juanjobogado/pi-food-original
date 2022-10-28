import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { getRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import {useSelector, useDispatch} from "react-redux"
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

export default function Home(){
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes)
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  // const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);


  // function handleClick(e) {
	// 	e.preventDefault();
	// 	dispatch(getRecipes());
	// }

  return (
  
    <div>
      <h1>Juanjitus</h1>
      {/* <button onClick={e => {handleClick(e)}}>Cargar las recetas</button> */}
      <SearchBar/>

      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes?.length}
        pagination = {pagination}
        currentPage = {currentPage}
      />
        
      {
        currentRecipes?.map((c) => (
          <div key={c.id} >
                        <Link to = { "/home/" + c.id }>
                        <Card
                            title = { c.title }
                            image = { c.image }
                            diets = { c.diets.join(", ") }
                            />
                            </Link>     
                    </div>
        ))
      }
    </div>
  );
};
