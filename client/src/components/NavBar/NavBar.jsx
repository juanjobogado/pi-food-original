import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  SearchBar from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipesByName, getRecipes } from "../../redux/actions";


export default function NavBar({pagination}){
    const dispatch = useDispatch();
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    let { dietTypes } = useSelector((state) => state);
    const [type, setType] = useState("");
    const [typesArr, setTypesArr] = useState([]);

    const handleOnChange = (e) => {
        setType(e.target.value);
      };
    

      function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
      }



  
      // const handleClickAdd = (e) => {
      //   if (type && !typesArr.includes(type)) setTypesArr([...typesArr, type]);
      //   dispatch(filterRecipesByType([...typesArr, type]));
      //   pagination(1)
      // };
    
      // const handleClickClear = (e) => {
      //   setTypesArr([])
      //   dispatch(filterRecipesByType([]));
      //   pagination(1)
      // };
    
      // const resetTypesArr = () => {
      //   setTypesArr([]);
      // };
    
     

    return (

      
      <div>
         <SearchBar/>

         <button onClick={e => {handleClick(e)}}>Cargar todas las recetas</button>
      
      </div>

      
    
    
        //   <div className="typeContainer">
        //     <div className="custom-dropdown types">
        //       <select onChange={handleOnChange}>
        //         <option disabled  defaultValue>Seleccione el tipo para agregar</option>
        //         {dietTypes?.map((e) => {
        //           return (
        //             <option value={e.name} key={e.id}>
        //               {e.name}
        //             </option>
        //           );
        //         })}
        //       </select>
        //     </div>
        //     <div>
        //       <button className="btn" onClick={handleClickAdd}>Agregar</button>
        //     </div>
    
        //     <div className="typearr">
        //       {typesArr?.map((e) => {
        //         return <span key={e}>-{e}</span>;
        //       })}
        //     </div>
            
        //     <div>
        //       <button className="btn" onClick={handleClickClear}>Actualizar</button>
        //     </div>
        //   </div>
          
        //   <div>
        //     <Link to="/create" className="createlink">
        //       <button  className="btn" type="button">Crear receta</button>
        //     </Link>
        //   </div>
    
        //   <div>
        //     <SearchBar reset={resetTypesArr} />
        //   </div>
        // </div>
      );
};

