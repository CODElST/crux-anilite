import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
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

function Register() {
  const [username, setUsername] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
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
  const handleSubmit = async () => {
    try {
      await fetch("https://dcbb-103-48-103-234.ngrok.io/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
        credentials: "include",
      }).then((res) => res.json().then((data) => console.log(data)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUser = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    fetch("https://crux-round-3.herokuapp.com/user/", {
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

  return (
    <div className="registerWrapper">
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
          Explore the world of anime with us
        </Typography>
        <Typography variant="h4" color="primary" sx={{ pt: 2 }}>
          REGISTER
        </Typography>
        <CustomDiv
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
            id="registerUsername"
            label="Username"
            size="small"
            type="text"
            InputLabelProps={{
              sx: { color: "primary.main" },
            }}
            sx={{ input: { color: "white" }, width: { xs: "90%", md: "70%" } }}
            onChange={(e) => setMail(e.target.value)}
          />
          <TextField
            id="registerEmail"
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
            id="registerPassword"
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomContainedButton onClick={() => handleUser()}>
            Submit
          </CustomContainedButton>
        </CustomDiv>
        <Typography variant="body2" color="secondary">
          Already a part of Anilite?
        </Typography>
        <Link to="/login">
          <Button variant="body2" sx={{ color: "primary.main" }}>
            Login Now
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default Register;
