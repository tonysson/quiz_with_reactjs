import React , {useEffect , useState , useContext} from 'react'
import { fireBaseContext } from './../Firebase';
import Loader from '../Loader/Loader';


const Logout = () => {

    //pour avoir acces a notre provider
    const firebase = useContext(fireBaseContext);
    //console.log(firebase); ici on acces a tous nos methodes de la classe fireBase

    const [checked , setChecked] = useState(false);
    const [loading , setLoading] = useState(false)


    // change the state
    const handleChange = e => {
        setChecked(e.target.checked)
    }

    // on peut creer une fnction et le passer a useEffect() ou carement faire comme on la fait
    // const logout = () => {
    //     if (checked) {
    //         console.log('deconnexion');
    //         firebase.signoutUser()
    //     }
    // }

    useEffect(() => {
        // logout() 
        if (checked) {
            setLoading(true)
            // console.log('deconnexion');
            firebase.signoutUser();
        }
    }, [checked , firebase]);



    // show loading
    const showLoading = () => (
        loading && <Loader />
    )

    return (
        <div className="logoutContainer">
            {showLoading()}
            <label  className="switch">
                <input type="checkbox" checked= {checked} onChange= {handleChange} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout
