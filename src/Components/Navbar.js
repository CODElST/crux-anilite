import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Stack,
  useScrollTrigger,
  CssBaseline,
  Slide,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import Loader from "./Loader";
import { CustomTextButton, CustomIconButton } from "./CustomButton";
import SearchIcon from "@mui/icons-material/Search";
import { CustomMenuModal, CustomLogoutModal } from "./CustomModal";
import { addAnime } from "../IDB/animeStore/animeActions";
import SearchModal from "./SearchModal";
import { signInWithFirebase, firebaseSignOut } from "../Firebase/GoogleAuth";
import LoginIcon from "@mui/icons-material/Login";

export default function Navbar() {
  const location = useLocation();
  const animeList = useSelector((state) => state.animeList);
  const { animes, error, loading } = animeList;

  const characterList = useSelector((state) => state.characterList);
  const { characters } = characterList;

  const [navbarOpacity, setNavbarOpacity] = React.useState(0);
  const listenScrollEvent = () => {
    if (window.scrollY > window.innerHeight / 2) {
      let opacity =
        ((window.scrollY - window.innerHeight / 2) / window.innerHeight) * 2;
      setNavbarOpacity(opacity);
    } else {
      setNavbarOpacity(0);
    }
  };

  React.useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/anime/")) {
      setNavbarOpacity(0);
      window.addEventListener("scroll", listenScrollEvent);
      return () => window.removeEventListener("scroll", listenScrollEvent);
    } else {
      setNavbarOpacity(1);
    }
  }, [location.pathname]);

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  return loading === true ? (
    <Loader />
  ) : error ? (
    <Typography variant="h1" color="primary" sx={{ textAlign: "center" }}>
      Error: {error}
    </Typography>
  ) : (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}>
        <AppBar
          position="fixed"
          sx={{
            background: `rgba(0,0,0,${navbarOpacity})`,
            height: 48,
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Stack direction="row" spacing={0.25}>
              <NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? "rgba(139, 92, 246, 1)" : "",
                    borderRadius: 3,
                  };
                }}
                to="/"
              >
                <CustomTextButton> Home </CustomTextButton>
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? "rgba(139, 92, 246, 1)" : "",
                    borderRadius: 3,
                  };
                }}
                to="all-anime"
              >
                <CustomTextButton> All Anime </CustomTextButton>
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? "rgba(139, 92, 246, 1)" : "",
                    borderRadius: 3,
                  };
                }}
                to="top-anime"
              >
                <CustomTextButton> Top Anime </CustomTextButton>
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    background: isActive ? "rgba(139, 92, 246, 1)" : "",
                    borderRadius: 3,
                  };
                }}
                to="about-us"
              >
                <CustomTextButton> About Us </CustomTextButton>
              </NavLink>
              {localStorage.getItem("user_uid") ? (
                <NavLink
                  style={({ isActive }) => {
                    return {
                      background: isActive ? "rgba(139, 92, 246, 1)" : "",
                      borderRadius: 3,
                    };
                  }}
                  to="dashboard"
                >
                  <CustomTextButton> Dash </CustomTextButton>
                </NavLink>
              ) : null}
            </Stack>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Typography
                variant="h2"
                color="secondary"
                sx={{ display: { md: "none" } }}
              >
                AL
              </Typography>
              <Typography
                variant="h2"
                color="secondary"
                sx={{ display: { md: "block", xs: "none" } }}
              >
                <span style={{ color: "#8B5CF6" }}>A</span>
                NI<span style={{ color: "#8B5CF6" }}>L</span>ITE
              </Typography>
            </div>
            <Stack
              direction={"row"}
              sx={{ marginLeft: "auto", marginRight: 0 }}
            >
              <SearchModal />
              {localStorage.getItem("user_name") ? (
                <CustomTextButton onClick={firebaseSignOut}>
                  <Avatar
                    src={localStorage.getItem("user_dp")}
                    sx={{ width: 36, height: 36, marginRight: 1 }}
                  />
                  Logout
                </CustomTextButton>
              ) : (
                <CustomTextButton onClick={signInWithFirebase}>
                  Login
                </CustomTextButton>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <CssBaseline />
        <HideOnScroll>
          <AppBar
            sx={{
              background: `rgba(0,0,0,0.7)`,
              height: 48,
              justifyContent: "center",
            }}
          >
            <Toolbar>
              <CustomMenuModal />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Typography
                  variant="h2"
                  color="secondary"
                  sx={{ display: { sm: "none", xs: "block" } }}
                >
                  AL
                </Typography>
                <Typography
                  variant="h2"
                  color="secondary"
                  sx={{ display: { sm: "block", xs: "none" } }}
                >
                  <span style={{ color: "#8B5CF6" }}>A</span>
                  NI<span style={{ color: "#8B5CF6" }}>L</span>ITE
                </Typography>
              </div>
              <Stack
                direction={"row"}
                sx={{ marginLeft: "auto", marginRight: 0 }}
              >
                <SearchModal />
                {localStorage.getItem("user_name") ? (
                  <CustomLogoutModal />
                ) : (
                  <CustomIconButton onClick={signInWithFirebase}>
                    <LoginIcon />
                  </CustomIconButton>
                )}
              </Stack>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Box>
    </>
  );
}
