import React, {useState , useEffect , useContext} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { fireBaseContext } from './../Firebase';


const Login = (props) => {

    //pour avoir acces a notre provider
    const firebase = useContext(fireBaseContext);
    //console.log(firebase); ici on acces a tous nos methodes de la classe fireBase

    //State
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error , setError] = useState('')
    const [loading, setLoading]  = useState(false)
    const [btn , setBtn] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)
        firebase.loginUser(email , password).then(user =>{
            // console.log(user);
            setLoading(false)
            setEmail('')
            setPassword('')
            props.history.push('/welcome')           
        }).catch(error => {
            setEmail('')
            setPassword('')
            setError(error)
            setLoading(false)
        })
    }


    // show loading
    const showLoading = () => (
        loading && <Loader />
    )

    //gestion error
    const errorMsg = error !== "" && <span>{error.message}</span>


//useEffect
    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Connexion</h2>
                        {errorMsg}
                        {showLoading()}
                        <form onSubmit={handleSubmit}>
                            
                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"  required autoComplete="off" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required autoComplete="off" />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">
                                Nouveau sur le quiz? inscrivez-vous
                           </Link>
                        </div>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/forget-password">
                                Mot de passe oublié? Recuperez-le
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
