import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById } from "../../redux/actions";

export default function RecipeDetails(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipesById(id));
      },[dispatch]);
    

    const recipeDetail = useSelector((state) => state.detail);
    const id = props.match.params.id;
// return (
//     <div>
//         {
//             myRecipe.length > 0 ? 
//             <div>
//                 <h1>{myRecipe[0]?.title}</h1>
//                 <img src = {myRecipe[0]?.image}/>
//             </div>
//             :
//             <h2>hola</h2>
//         }
//     </div>
// )

return (
    <div>
      <div>
        <Link to={`/home`}>Home</Link>
      </div>
      <div>
        <div>
          <h2>{recipeDetail[0]?.title}</h2>
        </div>
        <div>
          <img src={recipeDetail[0]?.image} alt="img" className="image" width="370px" height="280px"/>
        </div>
        <div>
          <h2>DISH TYPES: {recipeDetail[0]?.dishTypes}</h2>
        </div>
        <h3>TYPES OF DIETS</h3>
        <div>
          {recipeDetail[0]?.diets?.map((e) => {
            return (
              <h4 key={e}>
                {e}
              </h4>
            );
          })}
        </div>
        <div>
          <h5>SUMMARY</h5>
          <p>{recipeDetail[0]?.summary}</p> 
        </div>
        <div>
          <h4>HEALTH SCORE: {recipeDetail[0]?.healthScore}</h4>
        </div>
        <div>
          <h4>STEP BY STEP:</h4>
          <p>{recipeDetail[0]?.steps}</p>
          {/* {recipeDetail[0]?.analyzedInstructions &&
            recipeDetail.steps?.map((e) => {
              return ( 
                <div key={e.step}>
                  <p>{e.step}</p>
        </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};