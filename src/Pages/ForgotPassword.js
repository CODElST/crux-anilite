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

var getCookies = function () {
  const allCookies = document.cookie;
  console.log(allCookies);
};

function ForgotPassword() {
  const [mail, setMail] = React.useState("");
  const [credentialError, setCredentialError] = React.useState(false);
  // const handleSubmit = async () => {
  //   try {
  //     await axios
  //       .post(
  //         "https://fab6-103-48-103-234.ngrok.io/user/ForgotPassword",
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
  };
  const handleSubmit = async () => {
    try {
      await fetch("https://dcbb-103-48-103-234.ngrok.io/user/ForgotPassword", {
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
    try {
      await fetch("https://dcbb-103-48-103-234.ngrok.io/user", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("https://dcbb-103-48-103-234.ngrok.io/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }).then((res) => res.json().then((data) => console.log(data)));
    } catch (error) {
      console.log(error);
    }
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
          Don't worry, we got you
        </Typography>
        <Typography variant="h4" color="primary" sx={{ pt: 2 }}>
          FORGOT PASSWORD
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
          <Typography
            variant="subtitle1"
            color="secondary"
            sx={{ textAlign: "center" }}
          >
            Enter your mail linked to your Anilite account and we will send
            further instructions on how to reset your password there.
          </Typography>
          <TextField
            id="gorgotPassword"
            label="Email"
            size="small"
            InputLabelProps={{
              sx: { color: "primary.main" },
            }}
            sx={{ input: { color: "white" }, width: { xs: "90%", md: "70%" } }}
            error={credentialError ? true : false}
            helperText={
              credentialError
                ? "No account linked with this email found. Please create a new account."
                : ""
            }
            onChange={(e) => setMail(e.target.value)}
          />

          <CustomContainedButton disabled={credentialError ? true : false}>
            Submit
          </CustomContainedButton>
        </CustomDiv>
        <Link to="/login">
          <Button variant="body2" sx={{ color: "primary.main" }}>
            Back to login
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default ForgotPassword;
