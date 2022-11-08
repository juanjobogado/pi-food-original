import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./RecipeCreate.css";

function validation(input) {
    let errors = {};
    //console.log(input.title + ">>>>>>>>>>>>>>>>>>>> VALID")
    // title
    let nameRegex = /^[a-zA-Z]+$/g;
    if (!input.title) errors.title = "Can't be empty";
    else if (!nameRegex.test(input.title)) {
        errors.title = "Only Alphabetic Characters";
    }
    //Summary
    if (!input.summary) errors.summary = "Can't be empty";
    else if (input.summary.length < 20) {
        errors.summary = "Must be more than 20 characters";
    }
    // Image
    // var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
    // if (!input.image) errors.image = "Image link can't be blank";
    // else if (!imgPattern.test(input.image))
    //     errors.image = "Must be a image link and a jpg or png file";
    // Height
    if (!input.healthScore) errors.healthScore = "The Socre can't be empty";
    else if (input.healthScore <= 0 || input.healthScore > 100)
        errors.healthScore = "Must be between 0 and 100";
    //ListDiets		
    // if (!input.idDiets.value > "") errors.idDiets = "Check almost one option";
    //analyzedInstructions
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
        <div className="containerRecipeCreate">
            <div className="btnRecipeCreateContainer">
            <Link to = "/home"><button className="btnRecipeCreate">Volver</button></Link>
            </div>
        
            <div className="containerCardCreate">
            <h1 className="titleCreate">¡Crea tu receta!</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className="labelCreate">Titulo:</label>
                    <input
                    type="text"
                    value={input.title}
                    name = "title"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.title && (<span>{errors.title}</span>)}
                </div>
                <div>
                    <label className="labelCreate">Resumen:</label>
                    <input
                    type = "text"
                    value = {input.summary}
                    name = "summary"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && (<span>{errors.summary}</span>)}
                </div>
                <div>
                    <label className="labelCreate">Puntos de salud:</label>
                    <input
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && (<span>{errors.healthScore}</span>)}
                </div>
                <div>
                    <label>Pasos:</label>
                    <input
                    type = "text"
                    value = {input.steps}
                    name = "steps"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.steps && (<span>{errors.steps}</span>)}
                </div>
                <div>
                    <label>Tipos de platos:</label>
                    <input
                    type = "text"
                    value = {input.dishTypes}
                    name = "dishTypes"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && (<span>{errors.summary}</span>)}
                </div>
                <div>
					<ul>
					    {diets.map((e) => {
							return (
			    				<li key={e.id}>
									<input
										type="checkbox"
										id={e.id}
										name={e.name}
										value={`${e.name}`}
										onChange={(e) => handleCheck(e)}
										/>
				<label htmlFor={e.id}>{e.name}</label>
								</li>
                                
                // <label><input
                // key={e.name}
                // type = "checkbox"
                // name = {e.name}
                // value = {e.name}
                // onChange = {(e) => handleCheck(e)}
                // />{e.name}</label>
									);
                                   
								})}
								
					</ul>
                    
               
                </div>
                <button type = "submit">Crear receta...</button>
            </form>
            </div>
        </div>
    )
}


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postRecipe, getDiets } from "../../redux/actions";
// import Footer from "../../footer/Footer";
// import Header from "../../header/Header";
// import "./createRecipes.css";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";

// export default function CreateRecipes() {
// 	const [errors, setErrors] = useState({});
// 	const dispatch = useDispatch();
// 	const allDiets = useSelector((state) => state.diets);
// 	const history = useHistory();
// 	const [input, setInput] = useState({
// 		title: "",
// 		summary: "",
// 		healthScore: "",
// 		analyzedInstructions: [],
// 		idDiets: [],
// 		image: "",
// 		like: "",
// 	});

// 	const sendToDB = {
// 		title: input.title,
// 		summary: input.summary,
// 		healthScore: input.healthScore,
// 		analyzedInstructions: input.analyzedInstructions
// 			? input.analyzedInstructions.join(",")
// 			: "",
// 		idDiets: input.idDiets ? input.idDiets.join(",") : "",
// 		image: input.image,
// 		like: input.like,
// 	};
// 	function validation(input) {
// 		let errors = {};
// 		//console.log(input.title + ">>>>>>>>>>>>>>>>>>>> VALID")
// 		// title
// 		let nameRegex = /^[a-zA-Z]+$/g;
// 		if (!input.title) errors.title = "Can't be empty";
// 		else if (!nameRegex.test(input.title)) {
// 			errors.title = "Only Alphabetic Characters";
// 		}
// 		//Summary
// 		if (!input.summary) errors.summary = "Can't be empty";
// 		else if (input.summary.length < 20) {
// 			errors.summary = "Must be more than 20 characters";
// 		}
// 		// Image
// 		var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
// 		if (!input.image) errors.image = "Image link can't be blank";
// 		else if (!imgPattern.test(input.image))
// 			errors.image = "Must be a image link and a jpg or png file";
// 		// Height
// 		if (!input.healthScore) errors.healthScore = "The Socre can't be empty";
// 		else if (input.healthScore <= 0 || input.healthScore > 100)
// 			errors.healthScore = "Must be between 0 and 100";
// 		//ListDiets		
// 		// if (!input.idDiets.value > "") errors.idDiets = "Check almost one option";
// 		//analyzedInstructions
// 		if (!input.analyzedInstructions) errors.analyzedInstructions = "Can't be empty";
// 		// else if (input.analyzedInstructions.length < 10) {
// 		// 	errors.analyzedInstructions = "Must be more than 20 characters";
// 		// }
// 		return errors;
// 	}

// 	function handleChange(e) {
// 		//console.log(e.target.name + '*************' + e.target.value)
// 		setInput({
// 			...input,
// 			[e.target.name]: e.target.value,
// 		});
// 		setErrors(
// 			validation({
// 				...input,
// 				[e.target.name]: e.target.value,
// 			})
// 		);
// 		// console.log(input)
// 	}
// 	function handleCheck(e) {
// 		if (e.target.checked) {
// 			setInput({
// 				...input,
// 				idDiets: [...input.idDiets, e.target.value],
// 			});
// 		}
// 	}

// 	useEffect(() => {
// 		dispatch(getDiets());
// 	}, [dispatch]);

// 	const [stepList, setStepList] = useState([{ analyzedInstructions: "" }]);
// 	// console.log(stepList)

// 	const handleStepAdd = () => {
// 		//e.preventDefault();
// 		setStepList([...stepList, { analyzedInstructions: "" }]);
// 	};
// 	const handleStepRemove = (index) => {
// 		//e.preventDefault();
// 		const list = [...stepList];
// 		//console.log(index);
// 		list.splice(index);
// 		setStepList(list);
// 	};
// 	//console.log(...stepList)
// 	const handleServiceChange = (e, index) => {
// 		//    e.preventDefault();
// 		const { name, value } = e.target;
// 		let list = [...stepList];
// 		list[index][name] = value;
// 		//console.log(list);
// 		setStepList(list);
// 		setInput({
// 			...input,
// 			analyzedInstructions: list.map((e) => e.analyzedInstructions),
// 		});
// 	};
// 	function handleSubmit(e) {
// 		e.preventDefault();
// 		// console.log(
// 		// 	input.title +
// 		// 		"==>" +
// 		// 		input.summary +
// 		// 		"==>" +
// 		// 		input.healthScore +
// 		// 		"==>" +
// 		// 		input.analyzedInstructions +
// 		// 		"==>" +
// 		// 		input.idDiets +
// 		// 		"==>" +
// 		// 		input.image +
// 		// 		"==>" +
// 		// 		input.like
// 		// );
// 		if(Object.keys(validation(input)).length === 0){

// 			dispatch(postRecipe(sendToDB))
			
// 			setInput({
// 				title: "",
// 				summary: "",
// 				healthScore: "",
// 				analyzedInstructions: [],
// 				idDiets: [],
// 				image: "",
// 				like: "",
// 			})
// 			setTimeout(() => {
// 				history.push("/recipes");				
// 			}, 1000);
// 		}
// 		//setErrors(validation(input));


	
		
// 	}

// 	return (
// 		<>
// 			<Header />

// 			<div className="containerCreateRecpe">
// 				<h2 className="cardTitle">Create Your Own Recipe</h2>

// 				<div>
// 					<form onSubmit={(e) => handleSubmit(e)} className="containerForm">
// 						<div className="inputsForm">
// 							<input
// 								className="inputNameRecipe"
// 								type="text"
// 								name="title"
// 								value={input.title}
// 								placeholder="Recipe Name"
// 								onChange={(e) => handleChange(e)}
// 							/>
// 							{/* {console.log(errors.name)} */}
// 							{errors.title && (<span className="errorTitle errorsMsg">{errors.title}</span>)}
// 							<label className="lblScore">Health Score</label>
// 							<input
// 								className="inputScore"
// 								type="number"
// 								name="healthScore"
// 								value={input.healthScore}
// 								onChange={(e) => handleChange(e)}
// 							/>
// 							{errors.healthScore && (
// 								<span className="errorScore errorsMsg">{errors.healthScore}</span>
// 							)}
// 						</div>
// 						<div className="textAreaSummary">
// 							<textarea
// 								className="textAreaRecipe"
// 								name="summary"
// 								value={input.summary}
// 								cols="60"
// 								rows="60"
// 								placeholder="Recipe Description"
// 								onChange={(e) => handleChange(e)}
// 							/>
// 							{errors.summary && (<span className="errorSummary errorsMsg">{errors.summary}</span>)}
// 						</div>
// 						<div className="uploadPhoto">
// 							<div className="divSubmit">
// 								<button className="btnSubmit" type="submit">
// 									Create Recipe
// 								</button>
// 							</div>
// 							Upload a photo of your recipe
// 							<input
// 								className="btnUploadImg"
// 								type="text"
// 								name="image"
// 								value={input.image}
// 								onChange={(e) => handleChange(e)}
// 							/>
// 							{errors.image && <span className="errorImg errorsMsg">{errors.image}</span>}
// 						</div>
// 						<div className="containerListDiet">
// 							<label className="lblListDiets">Type Diets</label>
// 							<ul className="listDiets">
// 								{allDiets.map((e) => {
// 									return (
// 										<li key={e.id}>
// 											<input
// 												type="checkbox"
// 												id={e.id}
// 												className="checkboxDiets"
// 												name={e.name}
// 												value={`${e.name}`}
// 												onChange={(e) => handleCheck(e)}
// 											/>
// 											<label htmlFor={e.id}>{e.name}</label>
// 										</li>
// 									);
// 								})}
// 								{errors.idDiets && (
// 									<span className="errorDiets errorsMsg">{errors.idDiets}</span>
// 								)}
// 							</ul>
// 						</div>
// 						<div className="stepsForm">
// 							<label className="lblSteps">How to cook Step by Step</label>
// 							<div className="flexSteps">
// 								{stepList.map((singleStep, index) => (
// 									<div key={index} className="addStep textAreaAdded">
// 										{/* {console.log(index)} */}
// 										<div className="firstDivision">
// 											<textarea
// 												className="textAreaSteps"
// 												name="analyzedInstructions"
// 												cols="60"
// 												rows="60"
// 												placeholder="Step Description"
// 												value={singleStep.step}
// 												onChange={(e) => handleServiceChange(e, index)}
// 											/> {errors.analyzedInstructions && (<span className="errorAnalyzedInstructions errorsMsg">{errors.analyzedInstructions}</span>)}
// 											<div className="btnsDivisions">
// 												{stepList.length - 1 === index && stepList.length < 6 && (
// 													<button
// 														className="addStepList"
// 														onClick={handleStepAdd}
// 													>
// 														+
// 													</button>
// 												)}
// 												<div className="secondDivision">
// 													{stepList.length > 1 && (
// 														<button
// 															className="delStepList"
// 															onClick={() => handleStepRemove(index)}
// 														>
// 															x
// 														</button>
// 													)}
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 						<div>
// 							<input className="likeInput" type="text" name="like" value={input.like} onChange={(e) => handleChange(e)} />
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 			<Footer />
// 		</>
// 	);
// }