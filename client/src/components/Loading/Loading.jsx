import React from "react";
import styles from "./Loading.module.css";

export default function Loading(){
    return(
        <div className={styles.Loading}>
            <div className={styles.divLoading}>
            <img className={styles.gif} src="https://media.giphy.com/avatars/ChefSpecial/kVnqwZ5gbfe4.gif"/>
            <h4 className={styles.loading}>Loading...</h4>
            </div>
            </div>
    );
}

// import React from "react";
// import './Loading.module.css';

// const curiosidad = [
//     "Las manzanas pertenecen a la familia de las rosas",
//     "Las almendras no son nueces",
//     "Las zanahorias no siempre fueron color naranja",
//     "El sandwich fue inventado durante un juego de cartas",
//     "La pizza hawaiana fue inventada en Canadá",
//     "El algodón de azúcar fue inventado por un dentista",
//     "Un cuarto de todas las avellanas del mundo son usadas para hacer Nutella",
//     "Sin moscas no tendríamos chocolate",
//     "El mango puede sufrir quemaduras solares",
//     "La miel no tiene fecha de vencimiento"
// ]

// export default function Loader() {
//     return (
//         <div className="loadercontainer">
//             <div className="contentloader">
//                     <h1 className="cargando">CARGANDO</h1>
//                 <span className="loader"></span>
//                 <div className="sabias"><h2>Sabias qué?...</h2>
//                     <h3>{curiosidad[Math.floor((Math.random() * curiosidad.length))]}</h3></div>

//             </div>
//         </div>

//     )
// }