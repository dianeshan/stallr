import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";

function Login() {

    return (
        <div>
            <NavBar />
            <LoginForm />
            <a href = "/registration">Don't Have an Account? Register</a>
        </div> 
        
    )
}

export default Login;