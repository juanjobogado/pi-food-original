import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { getRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import {useSelector, useDispatch} from "react-redux"
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import { filterRecipesByType, orderRecipesByName, orderByScore } from "../../redux/actions";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Home(){
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes)
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  // const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const [order, setOrder] = useState('');

  const history = useHistory();

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    if(!allRecipes.length){
      dispatch(getRecipes())
    }
    // !allRecipes.length ?  dispatch(getRecipes()) : null
    
   
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getRecipes());
  // }, [dispatch])


  // function handleClick(e) {
	// 	e.preventDefault();
	// 	dispatch(getRecipes());
	// }

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(orderRecipesByName(e.target.value));
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
    }; 

  function handleFilterType(e){
   e.preventDefault(); 
   dispatch(filterRecipesByType(e.target.value));
   setCurrentPage(1);
    }
  
  function handleOrderScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  };
  
  return (
  
    <div className="containerHome">
      {allRecipes.length? <div className="bg2">

<div className="head">
<div>
      <NavBar className="btnsHome" pagination={pagination}/>
      </div>
  
</div>


     
    


      <div className="filters">
      
      <select className="filterDiets" id="right" onChange={e => handleFilterType(e)}>
          <option value = "All">TODOS</option>
          <option value = "Gluten Free">Gluten Free</option>
          <option value = "Ketogenic">Ketogenic</option>
          <option value = "Lacto Ovo Vegetarian">Ovo Lacto Vegetariano</option>
          <option value = "Vegan">Vegano</option>
          <option value = "Pescatarian">Pescetariano</option>
          <option value = "Paleolithic">Paleolitico</option>
          <option value = "Primal">Primal</option>
          <option value = "Fodmap Friendly">Fodmap</option>
          <option value = "Whole 30">Whole 30</option>
          <option value = "Dairy free">Dairy Free</option>
          <option value = "Vegetarian">Vegetariano</option>
      </select>

      <select className="filterDiets" onChange={e => handleOrder(e)}>
          <option disabled  defaultValue="selected">Ordenar por...</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
      </select>

      <select className="filterDiets" id="left" onChange={e => handleOrderScore(e)}>
          <option disabled defaultValue="selected">Ordenar por Health Score...</option>
          <option value="asc"> - TO + </option>
          <option value="desc"> + TO - </option>
      </select>
      </div>
      
    <div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes?.length}
        pagination = {pagination}
        currentPage = {currentPage}
      />
    </div>

        <div className="cards">
      {
        currentRecipes?.map((c) => (
          <div key={c.id} >
                        <Link to = { "/home/" + c.id }>
                        <Card
                            title = { c.title }
                            image = { c.image }
                            diets = { typeof c.diets === "string" ? c.diets : c.diets?.join(", ") }
                            />
                            </Link>     
                    </div>
        ))
      }
      </div>

      <div>
      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes = {allRecipes?.length}
        pagination = {pagination}
        currentPage = {currentPage}
      />
    </div>

      </div> : <Loading/> }
    </div>
  );
};
