import React, {useState , useContext} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { fireBaseContext } from './../Firebase';



const ForgetPassword = (props) => {

    //pour avoir acces a notre provider
    const firebase = useContext(fireBaseContext);


//State
const [email , setEmail] = useState('')
const [loading , setLoading] = useState(false);
const [error , setError] = useState(null)
const[success , setSuccess] = useState(null)


    const handleSubmit = e => {
      e.preventDefault();
      setLoading(true)
      firebase.passwordResset(email).then(() => {
        setLoading(false);
        setError(null);
        setSuccess(`Verifiez  ${email} pour reinitialiser le mot de passe`);
        setEmail('');

       //on veut rediriger la personne après 3seconde
       setTimeout(() => {
           setLoading(true)
           props.history.push('/login')
       }, 3000)

      }).catch((error) => {
          setLoading(false)
          setError(error)
           setEmail('')
      })
    }

    //disabled button
    const disabled = email ===""

    // show loading
    const showLoading = () => (
        loading && <Loader />
    )
    return (
        
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        { success && 
                        <span style={{ border : '1px solid green' , background : 'green' , color: '#ffffff'}}>
                            {success}
                        </span>
                        }

                        { error &&
                         <span>
                             {error.message}
                         </span>
                        }
                        <h2>Mot de passe oublié ?</h2>
                        {showLoading()}
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required autoComplete="off" />
                                <label htmlFor="email">Email</label>
                            </div>
                           <button disabled = {disabled} >
                               Recuper
                           </button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">
                               Dejà inscrit? Connectez-vous
                           </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword
