import React, { Fragment , useEffect , useState} from 'react';
import {GiTrophyCup} from 'react-icons/gi'

const QuizOver = React.forwardRef((props ,ref) => {

    //DESTRUCTURE
    const { levelNames, score, percent, quizLevel, maxQuestion, loadLevelQuestion } = props
    
   
    //console.log(ref.current);
    const [asked , setAsked] = useState([]);
 
   useEffect(() => {
    setAsked(ref.current)
   }, [ref]) ;

   // moyenne
   const averageGrade = maxQuestion / 2

   //si le user n'a pas la moyenne on lui recharge le quiz
   if(score < averageGrade){
    //    setTimeout(() => loadLevelQuestion(0) , 2000)
    setTimeout(() => loadLevelQuestion(quizLevel) , 3000)
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
                       <button className="btnInfo">Infos</button>
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
        </Fragment>

    )
})

export default React.memo(QuizOver)
