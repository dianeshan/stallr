import NavBar from "../components/NavBar";
import RegistrationForm from "../components/RegistrationForm";

function Registration() {

    return (
        <div>
            <NavBar />
            <RegistrationForm />
            <a href = "/login">Have an Account? Login</a>
        </div> 
        
    )
}

export default Registration;