import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById, Clean, Delete} from "../../redux/actions";
import photo from "../images/comidita.jpg"
import styles from "./RecipeDetails.module.css";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import { MdOutlineArrowBack } from "react-icons/md";

export default function RecipeDetails(props){
    const dispatch = useDispatch();
    const [change, setChange] = useState(false);
    const detail = useSelector((state) => state.detail);
    const id = props.match.params.id;
    const history = useHistory()

    useEffect(() => {
        dispatch(getRecipesById(id));
        setChange(true);
        return () => {dispatch(Clean())};
      },[dispatch, id]);



    const recipeDetail = useSelector((state) => state.detail);
    const recipeDetailDiets = useSelector((state) => state.detail);
    let diets = recipeDetailDiets[0]?.diets?.join(", ").charAt(0).toUpperCase() + recipeDetailDiets[0]?.diets?.join(", ").slice(1);
    let dishTypes = recipeDetailDiets[0]?.dishTypes?.join(", ").charAt(0).toUpperCase() + recipeDetailDiets[0]?.dishTypes?.join(", ").slice(1);
   function handleDelete(id) {
    dispatch(Delete(id));
    history.goBack();
  }
  

return (
  
    <div className={styles.containerDetails}>
   {detail.length  ? <div>
    <div className="btnRecipeCreateContainer">
            {/* <Link to = "/home"><button className="btnRecipeCreate">Volver</button></Link> */}
            <Link to = "/home">
            <MdOutlineArrowBack
            // onClick={() => Router.back()}
            className={styles.backBtn}
          />
          </Link>
            </div>

   

  
     <div  className={styles.containercardDetailsss}>
      <div>
          <h2 className={styles.h2DetailsTitle}>{recipeDetail[0]?.title}</h2>
      </div>
      <div className={styles.divContainerDishTypesAndDiets}>
      <div className={styles.containerImageDetailsFirst}>
        {recipeDetail[0]?.image ? (
                <img className={styles.containerImageInside} src={recipeDetail[0]?.image} alt = "There is no image"/>
            ):
                (
                    <img className={styles.imgDetailsDefault} src={photo} alt = "There is no image"/>
                )
            }
   </div>
   <div>
          <h4 className={styles.divContainerHealthScore}>HEALTH SCORE:<p> {recipeDetail[0]?.healthScore}.</p></h4>
        </div>
        <div className={styles.divContainerDishTypes}>
          <h2>DISH TYPES: <p>{dishTypes}.</p></h2>
        </div>
        <div className={styles.divContainerTypesOfDiets}>
        <h3>TYPES OF DIETS: <p>{diets}.</p></h3>
          
        </div>
        <div className={styles.containerImageDetails}>
        {recipeDetail[0]?.image ? (
                <img className={styles.containerImageInside} src={recipeDetail[0]?.image} alt = "There is no image"/>
            ):
                (
                    <img className={styles.imgDetailsDefault} src={photo} alt = "There is no image"/>
                )
            }
   </div>
       
        </div>
      <div className={styles.divContainerSummary}>
          <h5>SUMMARY:</h5>
          <p>{recipeDetail[0]?.summary}</p> 
        </div>
    
   
   
       
        <div className={styles.divContainerSteps}>
          <h4>STEP BY STEP:</h4>
          <p>{recipeDetail[0]?.steps}</p>
        </div>
        <div className={styles.divContainerDeleteButton}>
          <button className={styles.deleteButton} onClick={handleDelete}>Delete Recipe</button>
        </div>
            </div>
      </div> : <Loading/> }

      
      
    </div>
  );
};