import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import { getRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import {useSelector, useDispatch} from "react-redux"

export default function Home(){
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes)
  
  useEffect(() => {
    dispatch(getRecipes());
  },[dispatch]);


  function handleClick(e) {
		e.preventDefault();
		dispatch(getRecipes());
	}

  return (
  
    <div>
      <h1>Juanjitus</h1>
      <button onClick={e => {handleClick(e)}}>Cargar las recetas</button>
      {
        allRecipes?.map((c) => (
          <div key={c.id} >
                        <Link to = { "/home/" + c.id }>
                        <Card
                            title = { c.title }
                            image = { c.image }
                            diets = { c.diets }
                            />
                            </Link>     
                    </div>
        ))
      }
    </div>
  );
};
