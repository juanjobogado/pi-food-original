import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from  "./RecipeCreate.module.css";
import Loading from "../Loading/Loading";
import { MdOutlineArrowBack } from "react-icons/md";

function validation(input) {
    let errors = {};
   
    if (!input.title){
        errors.title = "Name is required"}
    else if (!input.title.match(/^[A-Za-z\s]+$/)){
        errors.title = "Only letters, please"
    
}

    if (!input.summary) errors.summary = "Can't be empty";
    else if (input.summary.length < 20) {
        errors.summary = "Must be more than 20 characters";
    }
    

    if (!input.healthScore) errors.healthScore = "The Score can't be empty";
    else if (input.healthScore <= 0 || input.healthScore > 100)
        errors.healthScore = "Must be between 0 and 100";
   
    if (!input.steps) errors.steps = "Can't be empty";
     else if (input.steps.length < 10) {
    	errors.steps = "Must be more than 20 characters";
     }

    if(!input.dishTypes) errors.dishTypes = "Can't be empty";
     else if(input.dishTypes.length < 10){
        errors.dishTypes = "Must be more than 10 characters";
     }
    return errors;
}


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
        steps:"",
        diets: []

    })

    function handleChange(e){
        setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validation({
				...input,
				[e.target.name]: e.target.value,
			})
		);
    }
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
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
        steps: "",
        diets: []
        })
         history.push("/home");
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);
    console.log(input.steps);
    console.log(diets)
    return (
        <div className={styles.containerRecipeCreate}>
            {diets.length? <div> <div className="btnRecipeCreateContainer">
            {/* <Link to = "/home"><button className="btnRecipeCreate">Volver</button></Link> */}
            <Link to = "/home">
            <MdOutlineArrowBack
            // onClick={() => Router.back()}
            className={styles.backBtn}
          />
          </Link>
            </div>
        <div className={styles.containerFormAndTitle}>
            <div>
            <h1 className="titleCreate"><u>Create your recipe</u></h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label for="title"><span className={styles.required}>Title:</span></label>
                    <input
                    className={styles.inputForm}
                    type="text"
                    value={input.title}
                    name = "title"
                    required="required"
                    autofocus="autofocus"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.title && (<span>{errors.title}</span>)}
                </div>
                <div>
                    <label for="summary"><span className={styles.required}>Summary:</span></label>
                    <input
                    className={styles.inputForm}
                    type = "text"
                    value = {input.summary}
                    name = "summary"
                    required="required"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && (<span>{errors.summary}</span>)}
                </div>
                <div>
                    <label for="healthScore"><span className={styles.required}>Health Score:</span></label>
                    <input
                    className={styles.inputForm}
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    required="required"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && (<span>{errors.healthScore}</span>)}
                </div>
        
                <div>
                    <label for="dishTypes"><span className={styles.required}>Dish Types:</span></label>
                    <input
                    className={styles.inputForm}
                    type = "text"
                    value = {input.dishTypes}
                    name = "dishTypes"
                    required="required"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && (<span>{errors.summary}</span>)}
                </div>
                <div>
                    <label for="steps"><span className={styles.required}>Steps:</span></label>
                    <input
                    className={styles.inputFormSteps}
                    type = "text"
                    value = {input.steps}
                    name = "steps"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.steps && (<span>{errors.steps}</span>)}
                </div>
                <div className={styles.dietsContainer}>
					{/* <ul> */}
					    {diets.map((e) => {
							return (
			    				// <li key={e.id}>
                                <div className={styles.checkboxDiv}>
									<input
                                        className={styles.checkboxs}
                                        id={e.id}
										type="radio"
										name={e.name}
										value={`${e.name}`}
										onChange={(e) => handleCheck(e)}
										/>
				<label className="labelCreate" htmlFor={e.id}>{e.name}</label>
                </div>
								// </li>
                                
                // <label><input
                // key={e.name}
                // type = "checkbox"
                // name = {e.name}
                // value = {e.name}
                // onChange = {(e) => handleCheck(e)}
                // />{e.name}</label>
									);
                                   
								})}
                </div>
                <button className={styles.buttonForm} type = "submit">Create</button>
            </form>
            </div>
            </div> : <Loading/>}
            
        </div>
    )
}