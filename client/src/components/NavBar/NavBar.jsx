import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  SearchBar from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipesByName, getRecipes } from "../../redux/actions";
import "./NavBar.css";

export default function NavBar({pagination}){
    const dispatch = useDispatch();
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState("");
    const [typesArr, setTypesArr] = useState([]);

    const handleOnChange = (e) => {
        setType(e.target.value);
      };
    

      function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
      }


  
     

    return (

      
      <div className="Navbar">

          
         <div className="divLoadRecipes">
         <button className="btnNavBarLoad" id="loadAllRecipes" onClick={e => {handleClick(e)}}>Cargar todas las recetas</button>
         </div>

         <div className="searchBar">
          <SearchBar />
          </div>

            <div>
             <Link to="/recipes">
               <button className="divCreateRecipe" id="createRecipes" type="button">Crear receta</button>
             </Link>
           </div>

      </div>
      );
};

