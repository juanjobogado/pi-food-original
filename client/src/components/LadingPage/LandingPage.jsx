import React from "react";
import { Link } from "react-router-dom";
import "../LadingPage/LandingPage.css";

export default function LandingPage(){
return (
  <div className="container">
    <div className="containerlanding">
      <div>
    <h1 >Henry Recipes Juan Bogado</h1>
      </div>
      <div className="btnlandin">
    <Link to = "/home">
      <button className="btnLan">
        INGRESAR
      </button>
    </Link>
      </div>
    </div>
  </div>
);
};