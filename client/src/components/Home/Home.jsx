import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { getRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import {useSelector, useDispatch} from "react-redux"
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import { filterRecipesByType } from "../../redux/actions";


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

  function handleFilterType(e){
    e.preventDefault();
    dispatch(filterRecipesByType(e.target.value));
    setCurrentPage(1);
  }


  // function handleClick(e) {
	// 	e.preventDefault();
	// 	dispatch(getRecipes());
	// }

  return (
  
    <div>
      <h1>Juanjitus</h1>
      {/* <button onClick={e => {handleClick(e)}}>Cargar las recetas</button> */}
      <div>
      <NavBar pagination={pagination}/>
      </div>
      
        <select onChange={e => handleFilterType(e)}>
          <option value = "All">Todos</option>
          <option value = "gluten Free">Gluten Free</option>
          <option value = "Ketogenic">Ketogenic</option>
          <option value = "lacto ovo vegetarian">Ovo Lacto Vegetariano</option>
          <option value = "vegan">Vegano</option>
          <option value = "pescatarian">Pescetariano</option>
          <option value = "paleolithic">Paleolitico</option>
          <option value = "primal">Primal</option>
          <option value = "fodmap friendly">Fodmap</option>
          <option value = "Whole 30">Whole 30</option>
          <option value = "Dairy free">Dairy Free</option>
          <option value = "Vegetarian">Vegetariano</option>
          <option value = "Lacto vegetarian">Lacto Vegetariano</option>
          <option value = "Ovo vegetarian" >Ovo Vegetariano</option>
        </select>

      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes?.length}
        pagination = {pagination}
        currentPage = {currentPage} //esto selene NO lo hace.
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
