import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  SearchBar from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipesByName, getRecipes } from "../../redux/actions";
import styles from "./NavBar.module.css";

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

      
      <div className={styles.Navbar}>

        <div className={styles.divLoading}>
          <Link to="/">
            <button className={styles.btnLanding}>Landing page</button>
          </Link>
        </div>
          
         <div className={styles.divNavBarLoad}>
         <button className={styles.btnNavBarLoad} id="loadAllRecipes" onClick={e => {handleClick(e)}}>Refresh</button>
         </div>

         <div className={styles.searchBar}>
          <SearchBar />
          </div>

            <div className={styles.divCreateRecipe}>
          <Link className={styles.LinkCreate} to="/recipes">
               <button className={styles.buttonCreateRecipe} id="createRecipes" type="button">
               
                Create recipe

                </button>
                    </Link>
           </div>

      </div>
      );
};

