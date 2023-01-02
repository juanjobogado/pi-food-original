import {
  FILTER_RECIPES_BY_TYPE,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_ID,
  GET_RECIPES_NAME,
  ORDER_RECIPES_BY_NAME,
  ORDER_RECIPES_SCORE,
  POST_RECIPE,
  CLEAN,
  DELETE,
} from "../actions/actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case FILTER_RECIPES_BY_TYPE:
      const allRecipes = state.allRecipes;

      const selectedDiet =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((e) => {
              let diet = "";
              for (let i = 0; i < e.diets?.length; i++) {
                if (e.diets[i] === action.payload.toLowerCase()) {
                  diet = e.diets[i];
                }
                console.log(e.diets[i]);
              }

              return diet;
            });

      return {
        ...state,
        recipes: selectedDiet,
      };

    case GET_RECIPES_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_RECIPES_BY_NAME:
      const recipesByName = state.recipes;
      const orderedRecipesbyName = recipesByName.sort(function (a, b) {
        if (action.payload === "asc") {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          } else {
            return 0;
          }
        } else if (action.payload === "des") {
          if (a.title > b.title) {
            return -1;
          } else if (a.title < b.title) {
            return 1;
          } else {
            return 0;
          }
        }
        return "Ordered";
      });
      return {
        ...state,
        recipes: orderedRecipesbyName,
      };

    case ORDER_RECIPES_SCORE:
      const orderScore =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderScore,
      };
    case POST_RECIPE:
      return {
        ...state,
      };

    case CLEAN:
      return {
        ...state,
        detail: [],
      };

    case DELETE:
      return {
        ...state,
        recipes: state.recipes.filter((r) => r.id !== action.payload),
      };

    default:
      return state;
  }
}
