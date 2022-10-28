// import React, {useState} from "react";
// import { useDispatch } from "react-redux";
// import { getRecipesName } from "../../redux/actions";

// export default function SearchBar(){
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState("");

//   function handleSubmit(e){
//     e.preventDefault();
//     // if(title) {
//       dispatch(getRecipesName(title));
//       setTitle("");
//     // } else{
//     //   alert("Enter correct recipe.");
//     // }
//   };

//   function handleChange(e){
//     e.preventDefault();
//     setTitle(e.target.value);
//   }

//   return (
//     <div>
//       {/* <form onSubmit={e => handleSubmit(e)}> */}
//         <input
//         type = "text"
//         // id = "title"
//         // value = {title}
//         placeholder = "Search Recipe..."
//         onChange = {e => handleChange(e)}
//         />
//         <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
//       {/* </form> */}
//     </div>
//   )
// };

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesName, getRecipes } from "../../redux/actions";





const SearchBar = () => {
	const dispatch = useDispatch();
	const [title, setName] = useState({ title: " " });
	const allRecipes = useSelector(state => state.recipes)
	
  useEffect(() => {
    dispatch(getRecipes());
},[dispatch])

	const handleChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
		
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let nameRegex = /^[a-zA-Z]+$/g;
		dispatch(getRecipesName(title));		
		setName(" ");
		document.getElementById("searchForm").reset();
		// console.log(name)
		let res = allRecipes.filter(e => e.title.toLowerCase().includes(title.toLowerCase()))
		
		// console.log(res)		
		if(!nameRegex.test(title) || !res.length ){
		alert("Receta no encontrada")
		}
	};


	return (
		<div className="inputContainer">
			<div>
				<form id="searchForm">
					<input
						type="text"
						placeholder="Search Recipe"
						onChange={(e) => handleChange(e)}
					/>
					<button
						className="btnSearch"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;