import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById, Clean} from "../../redux/actions";
import photo from "../images/comidita.jpg"
import "./RecipeDetails.css";

export default function RecipeDetails(props){
    const dispatch = useDispatch();
    const [change, setChange] = useState(false);
    const detail = useSelector((state) => state.detail);
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipesById(id));
        setChange(true);
        return () => {dispatch(Clean())};
      },[dispatch, id]);



    const recipeDetail = useSelector((state) => state.detail);


return (
  
    <div className="containerDetails">
   {detail.length  ? <div>
   <div className="btnToHome">
        <Link  to="/home"><button className="btnToHomeLink">Home</button></Link>
      </div>

   

  
     
          <h2 className="h2Detail">{recipeDetail[0]?.title}</h2>
       
        <div>
        {recipeDetail[0]?.image ? (
                <img src={recipeDetail[0]?.image} alt = "There is no image"/>
            ):
                (
                    <img src={photo} alt = "There is no image"/>
                )
            }
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
     

      </div> : <p>Loading...</p> }

      
      
    </div>
  );
};