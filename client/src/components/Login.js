import React, { useState, useRef} from "react";
import { useNavigate } from 'react-router-dom'; 
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import GoogleLogin from 'react-google-login';

import AuthService from "../services/auth.service";
import { Button, Card } from "react-bootstrap";

const clientId = "216887874666-d12ehqadnp082rbfjjbebeibstj0j1gt.apps.googleusercontent.com"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFailure = (result) => {
    console.log(result);
  };

  const handleGoogleLogin = async (googleData) => {
    const profile = googleData.getBasicProfile();
    AuthService.login(profile.getName(), profile.getId()).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
     
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Card className="card-container">
      <Card.Title>
        Share your toilet experiences!
      </Card.Title>
      {/* <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      /> 
      we can input our logo here!*/}
      <Form onSubmit={handleLogin} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validations={[required]}
          />
        </div>
        <div className="form-group pt-3">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </Button>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <div className="py-2">or</div>
      <GoogleLogin
              clientId={clientId}
              buttonText="Log in with Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              theme="dark"
            ></GoogleLogin>
    </Card>
  );
};

export default Login;