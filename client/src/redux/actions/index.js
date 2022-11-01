import axios from "axios";
import { GET_RECIPES, GET_RECIPES_NAME, FILTER_RECIPES_BY_TYPE, ORDER_RECIPES } from "./actions";

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
        const json = await axios.get(`http://localhost:3001/recipes?title=${title}`)
        return dispatch({
          type: GET_RECIPES_NAME,
          payload: json.data
        })
  
      } catch (error) {
        console.log(error.message)
        alert("Debes ingresar una receta existente")
      }
    }
  };

export function filterRecipesByType(payload){
  // return async function(dispatch){
  //   try {
  //     return dispatch({
  //       type: FILTER_RECIPES_BY_TYPE,
  //       payload: types
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return {
    type: FILTER_RECIPES_BY_TYPE,
    payload
  }

};

export function orderRecipes(order){
  return async function(dispatch){
    try {
      return dispatch({
        type: ORDER_RECIPES,
        payload: order
      })
    } catch (error) {
      // console.log(error);
    }
  }
};
