import React from "react";
import photo from "../images/comidita.jpg"
import "./Card.css";

var img = "https://st.depositphotos.com/1007298/1493/i/600/depositphotos_14931205-stock-photo-open-old-recipe-book.jpg";
export default function Card({title, image, diets}){
return(
    <div className="cardComp">
        <div className="cardComp2">
           
    <div className="leftCard">
    <div className="recipe">
            {image ? (
                <img className="recipe" src={`${image}`} alt = "There is no image"/>
            ):
                (
                    <img className="recipe" src={photo} alt = "There is no image"/>
                )
            }
    </div>
    </div>

   <div className="rightCard">
    <h3>{title}</h3>
    <div className="rightCardBottom">
            {
               typeof diets === "string" ? diets : 
                diets?.map( (e,i) => {
                    return (
                        <p key={i}>{e}</p>
                    )
                })
            
            }
        </div>
        </div>


        </div> 
    </div>
);
};