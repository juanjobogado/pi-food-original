import { FILTER_RECIPES_BY_TYPE, GET_RECIPES, GET_RECIPES_NAME, ORDER_RECIPES } from "../actions/actions";

const initialState = {
recipes: [],
allRecipes: [],

};

export default function reducer(state = initialState, action){

  switch (action.type) {
    case GET_RECIPES: 
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }

    case GET_RECIPES_NAME: 
      return {
        ...state,
        recipes: action.payload
      }

    case FILTER_RECIPES_BY_TYPE:
      const allRecipes = state.allRecipes;

      const selectedDiet = action.payload === "All" ? allRecipes : allRecipes.filter(e => {
          let diet = "";
              for(let i=0; i < e.diets.length; i++){
                  if(e.diets[i] === action.payload.toLowerCase()){
                      diet = e.diets[i];
                  }                                                                                        
                  console.log(e.diets[i])
              }                        
          
          return diet;
      })

      return{
          ...state,
          recipes: selectedDiet,                    
      }
      
      case ORDER_RECIPES:
        var functionOrdenator
        switch(action.payload){
          case "AZ":
            functionOrdenator = function(a,b){
              if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
              }
              if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
              }
              return 0
            }
            break; 
          
          case "ZA":
            functionOrdenator = function(a,b){
              if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1
              }
              if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1
              }
               return 0
            }
            break;

         case "<HS":
          functionOrdenator = function(a,b){
            if(a.healthScore < b.healthScore){
              return 1
            }
            if(a.healthScore > b.healthScore){
              return -1
            }
            return 0
          }
          break;

        case ">HS":
          functionOrdenator = function(a,b){
            if(a.healthScore < b.healthScore){
              return -1
            }
            if(a.healthScore > b.healthScore){
              return 1
            }
            return 0
          }
          break;

        default:
          break;

        }
        return {
          ...state,
          recipes: state.recipes.sort(functionOrdenator)
        }
      
  
    default:
      return state;
  }
};