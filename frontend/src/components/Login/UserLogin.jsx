import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLogin, setUserId } from "../../service/redux/reducers/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { decodeToken } from "react-jwt";

const UserLogin = () => {

  const { tokenUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logins, setLogins] = useState("");
  const [message, setMessage] = useState();
  useEffect(() => {
    if (tokenUser) {
      navigate("/");
    }
  });

  const LoginWithGoogle = async (user) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/users/login/Google",
        user
      );
       console.log(result.data);
      if (result.data.success) {
        setMessage("Account Created");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginHandle = async (event) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/users/login",
        logins
      );
      if (result.data.success) {
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.user_id));
        navigate("/");
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Server Error");
    }
  };
  return (
    <>
      <div>
        <h4>User Login</h4>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) =>
            setLogins({ ...logins, email: event.target.value })
          }
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setLogins({ ...logins, password: event.target.value })
          }
        />
        <br />
        <button
          onClick={(event) => {
            loginHandle(event);
          }}
        >
          Login
        </button>
        <h4>{message}</h4>
      </div>
      <GoogleOAuthProvider clientId="641945516994-pkvagvgme5fuv6usoigotsh4dki5a9fs.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const user = decodeToken(credentialResponse.credential);
        LoginWithGoogle(user)
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      ;
    </>
  );

};

export default UserLogin;
