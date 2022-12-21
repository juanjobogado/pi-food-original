 import React, {useState} from "react";
 import { useDispatch } from "react-redux";
 import { getRecipesName } from "../../redux/actions";
 import "./SearchBar.css";
 import { AiOutlineSearch } from "react-icons/ai"

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
  <form onSubmit={(e) => handleSubmit(e)}>
    <div className="input-wrapper">
         <input
         type = "text"
         value = {title}
         placeholder = "Search Recipe..."
         onChange = {e => handleChange(e)}
         />
         <button className="btn" type="submit"><AiOutlineSearch className="searchIcon"/></button>

       </div>
       </form>
   )
 };

 export default SearchBar;
