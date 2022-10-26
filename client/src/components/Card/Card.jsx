import React from "react";


export default function Card({title, image, diets}){
return(
    <div>
 
    <h3>{title}</h3>
            
    <img src={image} alt='img not found' />
            
    <p>
    <h5>{diets}</h5>
    </p>
            
    </div>
);
};