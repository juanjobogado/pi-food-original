import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  SearchBar from "../SearchBar/SearchBar";
import { filterRecipesByType, orderRecipes } from "../../redux/actions";


export default function NavBar({pagination}){
    const dispatch = useDispatch();
    let { dietTypes } = useSelector((state) => state);
    const [type, setType] = useState("");
    const [typesArr, setTypesArr] = useState([]);

    const handleOnChange = (e) => {
        setType(e.target.value);
      };
    
      function handleFilterType(e){
        dispatch(filterRecipesByType(e.target.value))
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
    
      // const handleOrder = (e) => {
      //   dispatch(orderRecipes(e.target.value));
      //   pagination(1)
      // }; 

    return (

      

      <div>
        <SearchBar/>
        {/* <select onChange={e => handleFilterType(e)}>
          <option value = "All">Todos</option>
          <option value = "Gluten Free">Gluten Free</option>
          <option value = "Ketogenic">Ketogenic</option>
          <option value = "Lacto Ovo Vegetarian">Ovo Lacto Vegetariano</option>
          <option value = "Vegan">Vegano</option>
          <option value = "Pescatarian">Pescetariano</option>
          <option value = "Paleolithic">Paleolitico</option>
          <option value = "Primal">Primal</option>
          <option value = "Fodmap Friendly">Fodmap</option>
          <option value = "Whole 30">Whole 30</option>
          <option value = "Dairy free">Dairy Free</option>
          <option value = "Vegetarian">Vegetariano</option>
          <option value = "Lacto vegetarian">Lacto Vegetariano</option>
          <option value = "Ovo vegetarian" >Ovo Vegetariano</option>
        </select> */}
      </div>

      
    
        //   <div className="custom-dropdown order">
        //     <select name="select" onChange={handleOrder}>
        //       <option disabled  defaultValue>Ordenado por...</option>
        //       <option value="AZ">A-Z</option>
        //       <option value="ZA">Z-A</option>
        //       <option value="<HS">Mayor puntaje de salud</option>
        //       <option value=">HS">Menor puntaje de salud</option>
        //     </select>
            
        //   </div>
    
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

