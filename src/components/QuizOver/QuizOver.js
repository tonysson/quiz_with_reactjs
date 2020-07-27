import React, { Fragment , useEffect , useState} from 'react';
import {GiTrophyCup} from 'react-icons/gi'
import Modal from './../Modal/Modal';
import axios from 'axios';
import Loader from './../Loader/Loader';
import { Link } from 'react-router-dom';




const QuizOver = React.forwardRef((props ,ref) => {

    //DESTRUCTURE
    const { levelNames, score, percent, quizLevel, maxQuestion, loadLevelQuestion } = props

    //API KEY
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC
    const API_HASH = process.env.REACT_APP_MARVEL_API_HASHED
    
    //console.log(ref.current);
    const [asked , setAsked] = useState([]);
    const [openModal , setOpenModal] = useState(false);
    const [info , setInfo] = useState([])
    const [loading , setLoading] = useState(true)

   //UseEFFECT 
   useEffect(() => {
    setAsked(ref.current);

    //verifie si la data du localStorage a expiré
       if (localStorage.getItem('marvelStoreDataAge')){
           const age = localStorage.getItem('marvelStoreDataAge')
           checkDataAge(age)
       }
   }, [ref])

   // data age
    const checkDataAge = age => {
        const today = Date.now()
        const timeDifference = today - age
        const daysDifference = timeDifference/ (1000 * 3600 * 24)

        if(daysDifference >= 15){
            localStorage.clear()
            localStorage.setItem('marvelStoreDataAge', Date.now())
        }
    }

   //SHOWMODAL
    const showModal =  id  => {
      setOpenModal(true)

      // une fois que je fais appel a l'api marvel je stocke l'info sur le localstorage pour ne pas repeter les mm requetes
      if(localStorage.getItem(id)){
        // si les info ont deja été chopé
          setInfo(JSON.parse(localStorage.getItem(id)));
          setLoading(false);
      }else{

          axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH}`)
              .then(response => {
                  setInfo(response.data);
                  setLoading(false);
                  // on stocke l'info sur le localStorage pour ne pas a fer appel a l'api marvel a chaque fw 
                  localStorage.setItem(id, JSON.stringify(response.data))
                  if (!localStorage.getItem('marvelStoreDataAge')) {
                      localStorage.setItem('marvelStoreDataAge', Date.now())
                  }
              })
              .catch(error => console.log(error))
      }

      }

    //HIDEMODAL
    const hideModal = () =>{
        setOpenModal(false);
        setLoading(true)
    }


   //MOYENNE
   const averageGrade = maxQuestion / 2

   //si le user n'a pas la moyenne on lui recharge le quiz
   if(score < averageGrade){
    //    setTimeout(() => loadLevelQuestion(0) , 2000)
    setTimeout(() => loadLevelQuestion(quizLevel) , 3000)
   }
   
   //capitalizeFirstLetter
   const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
   }
   // show btn , average of user and quizLevel
    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelNames.length ?
                        (
                            <Fragment>
                                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                                <button
                                    className="btnResult success"
                                    onClick={() => loadLevelQuestion(quizLevel)}
                                >
                                    Niveau Suivant
                                </button>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <p className="successMsg">
                                <GiTrophyCup size = '50px'/>    Bravo, vous êtes un expert !
                               </p>
                                <button
                                    className="btnResult gameOver"
                                    onClick={() => loadLevelQuestion(0)}
                                >
                                    Accueil
                                </button>
                            </Fragment>
                        )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent} %</div>
                <div className="progressPercent">Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
       )
        :
        (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué !</p>
                </div>

                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent} %</div>
                    <div className="progressPercent">Note: {score}/{maxQuestion}</div>
                </div>
            </Fragment>
)


   // show  answers in a table
   const questionAnswer = score >= averageGrade ? (
       asked.map(result => {
           return (
               <tr key={result.id}>
                   <td>{result.question}</td>
                   <td>{result.answer}</td>
                   <td>
                       <button 
                        className="btnInfo" 
                        onClick= {() => showModal(result.heroId)} >
                            Infos
                        </button>
                   </td>
               </tr>
           )
       })
   ) : (
           <tr >
               <td colSpan="3">
                   <div className="loader"></div>
                <p style={{textAlign : "center" , color : 'red'}}>
                    Pas de reponses !
                </p>
               </td>
           </tr>
   )

   //modal
   const resultInModal = !loading ? (

    <Fragment>
           <div className="modalHeader">
               <h2>
                   {info.data.results[0].name}
               </h2>
           </div>
           <div className="modalBody">
               <div className="comicImage">
                   <img src={info.data.results[0].thumbnail.path + '.' + info.data.results[0].thumbnail.extension} alt={info.data.results[0].name}/>

                   <p>
                       {info.attributionText}
                   </p>
               </div>
               <div className="comicDetails">
                 <h3>Description</h3>
                 {
                       info.data.results[0].description ? <p>
                           {info.data.results[0].description}
                       </p> : <p>
                           Description indisponible...
                       </p>
                 }
                 <h3>Plus d'infos</h3>
                 {
                       info.data.results[0].urls && info.data.results[0].urls.map((url , index) => {
                           return (

                               <Link key={index} to= {url.url} target="_blank" rel="nooppener noreferrer">
                                    {capitalizeFirstLetter(url.type)}
                               </Link>
                           )
                       })
                 }
               </div>
           </div>
           <div className="modalFooter">
               <button className="modalBtn" onClick={hideModal}>Fermer</button>
           </div>
    </Fragment>

   ) : (

           <Fragment>
               <div className="modalHeader">
                   <h2>
                      Titre de marvel...
                   </h2>
               </div>
               <div className="modalBody">
                   <Loader/>
               </div>
              
           </Fragment>

   )


    return (
       
        <Fragment>
        
            {decision}
            <hr/>
            <p>
                Les reponses aux questions posées
            </p>

            <div className="answerContainer">
                <table className="answers table table-bordered table-striped table-hover">
                    <thead>
                        <tr className="table-active text-center">
                            <th>Questions</th>
                            <th>Reponses</th>
                            <th>Plus d'infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openModal} hideModal={hideModal} >            
                {resultInModal}
            </Modal>
        </Fragment>

    )
})

export default React.memo(QuizOver)
