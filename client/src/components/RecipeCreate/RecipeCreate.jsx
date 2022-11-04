import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function validation(input){
    let errors = {};
    if(!input.title){
        errors.name = "Se requiere un nombre"
    } else if(!input.summary){
        errors.summary = "Se requiere un resumen"
    } else if(!input.healthScore){
        errors.healthScore = "Se requiere un healthScore"
    } else if(!input.image){
        errors.image = "Se requiere un resumen"
    }
};

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        image: "",
        diets: []

    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validation({
            ...input,
            [e.target.name] : e.target.value
        }))
        // console.log(input)
    }
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input));
        alert("Receta creada correctamente");
        setInput({
        title: "",
        summary: "",
        healthScore: "",
        image: "",
        diets: []
        })
        history.push("/home");
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    return (
        <div>
            <Link to = "/home"><button>Volver</button></Link>
            <h1>¡Crea tu receta!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Titulo:</label>
                    <input
                    type="text"
                    value={input.title}
                    name = "title"
                    onChange={handleChange}
                    />
                    {/* {errors?.name && (
                        <p>{errors.name}</p>
                    )} */}
                </div>
                <div>
                    <label>Resumen:</label>
                    <input
                    type = "text"
                    value = {input.summary}
                    name = "summary"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Puntos de salud:</label>
                    <input
                    type = "text"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type = "text"
                    value = {input.image}
                    name = "image"
                    onChange={handleChange}
                    />
                </div>
                <div>
                   {/* {diets.map((e) => {
                    return
                    (<label><input
                    type = "checkbox"
                    value = {e.name}
                    name = {e.name}
                    />{e.name}</label>)
                   })} */}

                <label>Type Diets</label>
					<ul>
					    {diets.map((e) => {
							return (
			    				<li key={e.id}>
									<input
										type="checkbox"
										id={e.id}
										className="checkboxDiets"
										name={e.name}
										value={`${e.name}`}
										onChange={(e) => handleCheck(e)}
										/>
				<label htmlFor={e.id}>{e.name}</label>
								</li>
									);
								})}
								{/* {errors.idDiets && (
									<span className="errorDiets errorsMsg">{errors.idDiets}</span>
								)} */}
					</ul>
                  {/* <label><input
                  type = "checkbox"
                  value = "Gluten Free"
                  name = "Gluten Free"
                  />Gluten Free</label>
                  <label><input
                  type = "checkbox"
                  value = "Ketogenic"
                  name = "Ketogenic"
                  />Ketogenic</label>
                  <label><input
                  type = "checkbox"
                  value = "Lacto Ovo Vegetarian"
                  name = "Lacto Ovo Vegetarian"
                  />Lacto Ovo Vegetarian</label>
                   <label><input
                  type = "checkbox"
                  value = "Vegan"
                  name = "Vegan"
                  />Vegan</label>
                  <label><input
                  type = "checkbox"
                  value = "Pescatarian"
                  name = "Pescatarian"
                  />Pescatarian</label>
                   <label><input
                  type = "checkbox"
                  value = "Paleolithic"
                  name = "Paleolithic"
                  />Paleolithic</label>
                   <label><input
                  type = "checkbox"
                  value = "Primal"
                  name = "Primal"
                  />Primal</label>
                   <label><input
                  type = "checkbox"
                  value = "Fodmap Friendly"
                  name = "Fodmap Friendly"
                  />Fodmap Friendly</label>
                   <label><input
                  type = "checkbox"
                  value = "Whole 30"
                  name = "Whole 30"
                  />Whole 30</label>
                   <label><input
                  type = "checkbox"
                  value = "Dairy free"
                  name = "Dairy free"
                  />Dairy free</label>
                   <label><input
                  type = "checkbox"
                  value = "Vegetarian"
                  name = "Vegetarian"
                  />Vegetarian</label>
                   <label><input
                  type = "checkbox"
                  value = "Lacto vegetarian"
                  name = "Lacto vegetarian"
                  />Lacto vegetarian</label>
                   <label><input
                  type = "checkbox"
                  value = "Ovo vegetarian"
                  name = "Ovo vegetarian"
                  />Ovo vegetarian</label> */}
                </div>

                <button type = "submit">Crear receta...</button>
            </form>
        </div>
    )
}