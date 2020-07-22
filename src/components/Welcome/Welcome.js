import React , {useState , useContext , useEffect} from 'react'
import Logout from './../Logout/Logout';
import Quiz from '../Quiz/Quiz';
import Loader from '../Loader/Loader';
import { fireBaseContext } from './../Firebase';

const Welcome = (props) => {

    //pour avoir acces a notre provider
    const firebase = useContext(fireBaseContext);

    //State
    const [userSession , setUserSession] = useState(null)
    const [userData , setUserData] = useState({})

    //useEffect
    // onAuthStateChange methode dont firebase nous donne pour verifier si un user est authentifié ou non
    useEffect(() => {

        //methode qui nous permet de verifier si on est connecté ou pas
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })

        // on veut avoir les info du user connecter , !! : different de null
        if(!!userSession){
            firebase.user(userSession.uid).get().then((doc) => {
                if (doc && doc.exists) {
               // console.log(doc)
                    const myData = doc.data()
                    setUserData(myData)
                }

            }).catch((error) => {
                console.log(error)
            })
        }
       

        // component will mount
        return () => {
            listener()
        }
    },[userSession , firebase , props.history])

  return  userSession === null ? (
        <Loader/>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz  userData = {userData}/>
            </div>

        </div>
    )

}   
   

export default Welcome
