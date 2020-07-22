import React , {useState, useContext} from 'react';
import {fireBaseContext} from './../Firebase';
import Loader from './../Loader/Loader';
import { Link } from 'react-router-dom';


const SignUp = (props) => {

    const firebase = useContext(fireBaseContext);
    //console.log(firebase); ici on acces a tous nos methodes de la classe fireBase

    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    //State
    const[loginData , setLoginData] = useState(data);
    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false)

    //Destructuring
    const {pseudo , email , password, confirmPassword} = loginData

    //condition pour afficher le button submit
  const submitBtn =   pseudo === "" || email === "" || password === "" || password !== confirmPassword ? (
      <button disabled >Inscription</button>
  ) : (
      <button>Inscription</button>
  )

    //HANDLECHANGE
    const handleChange = e => {
        setLoginData({
            ...loginData,
            [e.target.id] : e.target.value
        })
    }

    //HANDLESUBMIT
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)
        firebase.signupUser(email , password).then(authUser => {
             firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        }).then(() => {
            setLoginData({...data})
            setLoading(false)
            props.history.push('/welcome')
        }).catch(error => {
            setLoading(true)
            setError(error)
            setLoginData({ ...data })
            setLoading(false)
        })
    }

    // show loading
    const showLoading = () => (
        loading && <Loader/>
    )

    //gestion error
    const errorMsg = error !== "" && <span>{error.message}</span>
 
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
               <div className="formBoxLeftSignup"></div>
               <div className="formBoxRight">
                   <div className="formContent">
                       <h2>Inscription</h2>
                        {errorMsg}
                        {showLoading()}
                       <form onSubmit={handleSubmit}>
                           <div className="inputBox">
                               <input onChange = {handleChange} value={pseudo} type="text" id="pseudo" required autoComplete="off"/>
                               <label htmlFor="pseudo">Pseudo</label>
                           </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" required autoComplete="off" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" required autoComplete="off" />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" required autoComplete="off" />
                                <label htmlFor="confirmpassword">Confirmer le mot de passe</label>
                            </div>
                            {submitBtn}
                       </form>
                       <div className="linkContainer">
                           <Link className="simpleLink" to="/login">
                                Dejà inscrit? connectez-vous
                           </Link>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default SignUp
