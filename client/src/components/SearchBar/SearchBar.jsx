 import React, {useState} from "react";
 import { useDispatch } from "react-redux";
 import { getRecipesName } from "../../redux/actions";
import "./SearchBar.css";

 function SearchBar(){
   const dispatch = useDispatch();
   const [title, setTitle] = useState("");

   function handleSubmit(e){
     e.preventDefault();
      if(title) {
       dispatch(getRecipesName(title));
       setTitle("");
     } else{
        alert("Enter correct recipe.");
      }
   };

   function handleChange(e){
     e.preventDefault();
     setTitle(e.target.value);
   }

   return (
     <div>
      
    <div className="input-wrapper">
       {/* <form onSubmit={e => handleSubmit(e)}> */}
  
         <input
         className="input"
         type = "text"
         // id = "title"
         // value = {title}
         placeholder = "Search Recipe..."
         onChange = {e => handleChange(e)}
         />
      <div>
         <button className="btn" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
       {/* </form> */}
      </div>

       </div>
     </div>
   )
 };

 export default SearchBar;
