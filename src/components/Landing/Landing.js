import React, { useRef, useEffect, useState, Fragment} from 'react'
import { Link } from 'react-router-dom';


const Landing = () => {

    /**
     * L'idée est d'afficher les boutons inscriptions et connexion sur notre page au moment ou les griffes de wolverine disparait
     * OR sur l'image de base on a pas les griffes , donc on va les rajouter
     * on utilise UseRef() avec sa methode classList.add et classList.remove qui nous permet d'ajouter une className a un element sans ecraser l'autre
     * Apres on utilise useEffect() pour afficher nos griffes o moment ou le componet mount
     * on appplique setTiimeOut pour enlever les griffes et afficher nos boutons 
     */

     const [btn , setBtn] = useState(false)
    const refWolverine = useRef(null);
   

    useEffect(() => {
      refWolverine.current.classList.add('startingImg');

      setTimeout(() => {
          refWolverine.current.classList.remove('startingImg');
          setBtn(true)
      }, 1000);

    }, []);


    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg');
    }

    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg');
    }

    const clearImg = () => {
        if (refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('leftImg');
        } else if (refWolverine.current.classList.contains('rightImg')){
            refWolverine.current.classList.remove('rightImg')
        }
    }



    const displayBtn = btn && (
       
        <Fragment>
            <div className="leftBox">
                <Link style={{textDecoration:'none'}} to="/signup" onMouseOver={setLeftImg} onMouseOut={clearImg} className="btn-welcome">
                    Inscription
                </Link>
            </div>
            <div className="rightBox">
                <Link style={{ textDecoration: 'none' }} to="/login" onMouseOver={setRightImg} className="btn-welcome" onMouseOut={clearImg}>
                    Connexion
                </Link>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    )
}

export default Landing
