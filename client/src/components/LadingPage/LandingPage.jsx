import React from "react";
import { Link } from "react-router-dom";
import "../LadingPage/LandingPage.css";

export default function LandingPage(){
return (
  <div className="container">
    <div className="containerlanding">
      <div>
   <span>Find or create your recipe.</span>
      </div>
      <div className="btnlandin">
    <Link to = "/home">
      <button className="btnLan">
        START
      </button>
    </Link>
      </div>
    </div>
  </div>
);
};