import React, { Fragment } from 'react';
import Levels from './../Levels/Levels';
import ProgressBar from '../ProgressBar/ProgressBar';
import { QuizQuestions } from './../../quizQuestion/QuizQuestions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import QuizOver from './../QuizOver/QuizOver';
import { FaChevronRight} from 'react-icons/fa'



//on initialize l'objet toast
toast.configure()

//initialState
const initialState = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestion: 10,
    storeQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false,
    percent: null

}


class Quiz extends React.Component {

    constructor(props) {

        super(props)

        //state
        this.state = initialState
        
        //permet de stocker tout le tableau des questions et des reponses pour pouvoir comparer la reponse du user a la reponse stockée 
        this.storeDataRef = React.createRef()
    }


    // load the quiz questions from it's file QuizQuestions
    loadQuestions = (level) => {
        // je veux acceder au premier niveau 'debutant dans mon fichier QuizQuestions
        const fetchArrayQuiz = QuizQuestions[0].quizz[level]
        // console.log(fetchArrayQuiz);

        // on s'assure qu'il y a bien 10 questions a chaque niveau
        if (fetchArrayQuiz.length >= this.state.maxQuestion) {

            // ici on veut avoir tout le tableau avec et les questions et les reponses
            this.storeDataRef.current = fetchArrayQuiz

            //on veut garder tout le tableau sauf les reponses des question
            const newArray = fetchArrayQuiz.map(({ answer, ...rest }) => rest)
            // console.log(newArray);

            // on met a jour notre storeQuestions qui contient maintenant les questions sans les reponses
            this.setState({
                storeQuestions: newArray
            })

        }
    }

    // notifications message
    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {

            this.setState({ showWelcomeMsg: true })

            toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: "toastify-color-welcome"
            });
        }
    }
    //componentDidMount
    componentDidMount() {
        // avec this.state.levelNames[this.state.quizLevel] on accede au niveaux (debutant , confirme ou expert)
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }


    // allow us to choose an anwser and pass to next question and increase the score
    nextQuestion = () => {
        // on verifie si le idQuestion ne depasse pas 9 , si oui soit on passe a un autre level ou soit c'est la fin du quiz
        if (this.state.idQuestion === this.state.maxQuestion - 1) {
            // end of a level or end of the quiz
            this.setState({quizEnd: true})
        } else {
            // on va passer a une autre question en prenant la valeur qu'on avait precedement ds idQuestion et en l'incrementant
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }
        //on stocke la bonne reponse
        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer

        // on compare la bonne reponse a celle donnée par l'utilisateur et on increment le score
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1
            }))

            //on affiche un toast a l'utilisateur s'il a bien repondu ou pas
            toast.success('Bravo  +1', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: false,
                pauseOnHover: true,
                hideProgressBar: false,
                bodyClassName: "toastify-color-success"
            })
        } else {
            // on est dans le cas ou la personne a mal repondu a la question
            toast.error('Raté...', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: false,
                pauseOnHover: true,
                hideProgressBar: false,
                bodyClassName: "toastify-color-success"
            })
        }

    }

    //quand on veut mettre a  jour le state par this.setState  ds un component based on class on invoque:
    componentDidUpdate(prevProps, prevState) {

        // je veux connaitre l'etat habituel et continuel de storeQuestions pour modifier question et options dans mon state
        // donc dans un premier je charge la premiere question
        if ((this.state.storeQuestions !== prevState.storeQuestions) && this.state.storeQuestions.length ) {

            this.setState({
                // la j'accède a la question du quiz
                question: this.state.storeQuestions[this.state.idQuestion].question,
                //la on accede o options de la quetion
                options: this.state.storeQuestions[this.state.idQuestion].options
            })
        }

        // je mets a jour le state apres avoir invoqué la methode nextQuestion pour justement passé ala question suivante
        if ((this.state.idQuestion !== prevState.idQuestion) && this.state.storeQuestions.length ) {
            this.setState({
                // la j'accède a la question suivante du quiz
                question: this.state.storeQuestions[this.state.idQuestion].question,
                //la on accede o options de la quetion suivante
                options: this.state.storeQuestions[this.state.idQuestion].options,
                //je remet le userAnswer a null de nouveau
                userAnswer: null,
                //et je disabled le bouton a nouveau
                btnDisabled: true
            })
        }

        if (this.state.quizEnd !== prevState.quizEnd) {
            const gradepercent = this.getPercentage(this.state.maxQuestion, this.state.score);
            this.gameOver(gradepercent);
        }

        //pour afficher les notifications
        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }

    }


    //submit the answer
    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    //Pourcentage de reussite
    getPercentage = (maxQuest, ourScore) => {
        return (ourScore / maxQuest) * 100
    }

    

    //game over
    gameOver = percent => {

        if (percent >= 50) {
            
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent 
            })
        } else {
            this.setState({percent })
        }
    }


    //load another level questions
    loadLevelQuestion = param => {
        //on copie ts nos state sauf quizLevel 
        this.setState({
            ...this.initialState,
            quizLevel:param
        })
        //on va charger les questions
        this.loadQuestions(this.state.levelNames[param]);
    }

    render() {
        const option = this.state.options.map((option, index) => {
            return (
                <p
                    key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}>
                 <FaChevronRight/>   {option}
                </p>
            )
        })

        return (
            this.state.quizEnd ? (
                <QuizOver
                    loadLevelQuestion={this.loadLevelQuestion}
                    percent={this.state.percent}
                    maxQuestion={this.state.maxQuestion}
                    quizLevel={this.state.quizLevel}
                    score={this.state.score}
                    levelNames={this.state.levelNames}
                    ref={this.storeDataRef}
                />
            ) : (
                    <Fragment>
                        <Levels 
                          levelNames = {this.state.levelNames}
                          quizLevel = {this.state.quizLevel}
                        />
                        <ProgressBar idQuestion={this.state.idQuestion} maxQuestion={this.state.maxQuestion} />
                        <h2>
                            {this.state.question}
                        </h2>
                        {option}
                        <button
                            onClick={this.nextQuestion}
                            disabled={this.state.btnDisabled}
                            className="btnSubmit">
                            {this.state.idQuestion < this.state.maxQuestion - 1 ? "Suivant" : "Terminer"}
                        </button>
                    </Fragment>
                )

        )

    }
}

export default Quiz;