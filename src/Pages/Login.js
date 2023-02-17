import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CustomContainedButton,
  CustomTextButton,
} from "../Components/CustomButton";
import axios from "axios";
import { CustomDiv } from "../Components/CustomDiv";
import "../Media/ANILITELoader.css";
import { ReactComponent as AniliteLoader } from "../Media/AniliteLoader.svg";
import { Link } from "react-router-dom";
// import axiosConfig from "../axiosConfig";

var getCookies = function () {
  const allCookies = document.cookie;
  console.log(allCookies);
};

function Login() {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [credentialError, setCredentialError] = React.useState(false);
  // const handleSubmit = async () => {
  //   try {
  //     await axios
  //       .post(
  //         "https://fab6-103-48-103-234.ngrok.io/user/login",
  //         {
  //           email: mail,
  //           password: password,
  //         },
  //         {
  //           credentials: "include",
  //         }
  //       )
  //       .then((res) => console.log(res));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const newEntry = {
    email: mail,
    password: password,
  };

  // const handleSubmit = async () => {
  //   try {
  //     await fetch("https://crux-round-3.herokuapp.com/user/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newEntry),
  //       credentials: "include",
  //     }).then((res) => res.json().then((data) => console.log(data)));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = () => {
    fetch("https://crux-round-3.herokuapp.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
      credentials: "include",
    })
      .then((res) => {
        res.json().then((data) => console.log(data));
      })
      .catch((err) => console.log("this is the err", err));
  };

  // const handleUser = async () => {
  //   let headers = new Headers({
  //     Accept: "*/*",
  //   });
  //   try {
  //     await fetch("https://crux-round-3.herokuapp.com/user", {
  //       method: "GET",
  //       headers: headers,
  //       credentials: "include",
  //     })
  //       .then((res) => res)
  //       .then((data) => console.log(data))
  //       .then(console.log());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUser = (e) => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    fetch("https://crux-round-3.herokuapp.com/user", {
      method: "GET",
      headers: headersList,
      credentials: "include",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  // const handleLogout = async () => {
  //   try {
  //     await fetch("https://crux-round-3.herokuapp.com/user/logout", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     }).then((res) => res.json().then((data) => console.log(data)));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogout = async () => {
    let headersList = {
      Accept: "*/*",
    };

    fetch("https://crux-round-3.herokuapp.com/user/logout", {
      method: "POST",
      headers: headersList,
      credentials: "include",
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  return (
    <div className="loginWrapper">
      <Container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "10%",
          flexDirection: "column",
        }}
      >
        <Link to="/" style={{ cursor: "pointer" }}>
          <AniliteLoader
            style={{
              width: "120px",
              position: "relative",
            }}
          />
        </Link>
        <Typography variant="h4" color="secondary">
          Welcome Anime Lover
        </Typography>
        <Typography variant="h4" color="primary" sx={{ pt: 2 }}>
          LOGIN
        </Typography>
        <div
          id="g_id_onload"
          data-client_id="92339166354-0mv29e6463jrn0ekagfk1nvdgd55g2hb.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-login_uri="http://localhost:8000/"
          data-auto_prompt="false"
        ></div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="continue_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
        {/* <CustomDiv
          sx={{
            width: { xs: "90%", md: "40%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
            flexDirection: "column",
            gap: 2,
            padding: 2,
            py: 4,
          }}
        >
          <TextField
            id="loginEmail"
            label="Email"
            size="small"
            type="text"
            InputLabelProps={{
              sx: { color: "primary.main" },
            }}
            sx={{ input: { color: "white" }, width: { xs: "90%", md: "70%" } }}
            onChange={(e) => setMail(e.target.value)}
          />
          <TextField
            id="loginPassword"
            label="Password"
            size="small"
            InputLabelProps={{
              sx: { color: "primary.main" },
            }}
            sx={{ input: { color: "white" }, width: { xs: "90%", md: "70%" } }}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((password) => !password)}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={credentialError ? true : false}
            helperText={credentialError ? "Invalid Email/Password" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{
              textAlign: "right",
              width: { xs: "90%", md: "70%" },
            }}
          >
            <Link to="/forgot-password" style={{ color: "white" }}>
              Forgot Password?
            </Link>
          </Typography>
          <CustomContainedButton
            disabled={credentialError ? true : false}
            onClick={() => handleSubmit()}
          >
            Submit
          </CustomContainedButton>
          <CustomContainedButton
            disabled={credentialError ? true : false}
            onClick={() => handleUser()}
          >
            Get User
          </CustomContainedButton>
          <CustomContainedButton
            disabled={credentialError ? true : false}
            onClick={() => handleLogout()}
          >
            Logout
          </CustomContainedButton>
        </CustomDiv>
        <Typography variant="body2" color="secondary">
          Not a part of the Anilite community?
        </Typography>
        <Link to="/register">
          <Button variant="body2" sx={{ color: "primary.main" }}>
            Join Now
          </Button>
        </Link> */}
      </Container>
    </div>
  );
}

export default Login;
