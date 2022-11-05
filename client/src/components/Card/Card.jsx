import React from "react";

var img = "https://st.depositphotos.com/1007298/1493/i/600/depositphotos_14931205-stock-photo-open-old-recipe-book.jpg";
export default function Card({title, image, diets}){
return(
    <div>
 
    <h3>{title}</h3>
    
    <img src={image ? image : img }  alt="There is no image for this recipe"/>
            
    <p>
    <h5>{diets}</h5>
    </p>
            
    </div>
);
};