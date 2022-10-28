import axios from "axios";
import { GET_RECIPES, GET_RECIPES_NAME, } from "./actions";

export function getRecipes(){
    return async function(dispatch){
        try {
            const json = await axios.get("http://localhost:3001/recipes");
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export function getRecipesName(title){
    return async function(dispatch){
      try {
        const json = axios.get(`http://locashost:3001/recipes?title=${title}`)
        return dispatch({
          type: GET_RECIPES_NAME,
          payload: json.data
        })
  
      } catch (error) {
        console.log(error)
        alert("Debes ingresar una receta existente")
      }
    }
  };
