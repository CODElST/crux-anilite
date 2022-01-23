import React from "react";
import { Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{
        marginTop: 50,
        height: 300,
        width: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Typography
        variant={"h3"}
        style={{
          position: "relative",
          top: "20%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontFamily: "quicksand",
          cursor: "default",
        }}
      >
        A N I L I T E
      </Typography>
      <Link to="/about-us" exact>
        <Typography
          variant={"body1"}
          component={motion.div}
          whileHover={{ scale: 1.09 }}
          style={{
            color: "white",
            textTransform: "capitalize",
            fontFamily: "quicksand",
            position: "relative",
            top: "30%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Made with ❤️ by SHIVANSH & AARUSH
        </Typography>
      </Link>

      <Stack
        direction={"row"}
        spacing={2}
        sx={{ position: "relative", top: "37%", justifyContent: "center" }}
      >
        <Link to="/" exact>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={motion.div}
            whileHover={{ scale: 1.09 }}
          >
            Home
          </Typography>
        </Link>
        <Link to="/all-anime" exact>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={motion.div}
            whileHover={{ scale: 1.09 }}
          >
            All Anime
          </Typography>
        </Link>
        <Link to="/top-anime">
          <Typography
            variant="subtitle2"
            color="secondary"
            component={motion.div}
            whileHover={{ scale: 1.09 }}
          >
            Top Anime
          </Typography>
        </Link>
        <Link to="/about-us" exact>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={motion.div}
            whileHover={{ scale: 1.09 }}
          >
            About Us
          </Typography>
        </Link>
      </Stack>
      <Typography
        style={{
          color: "white",
          textTransform: "capitalize",
          fontFamily: "quicksand",
          position: "relative",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          cursor: "default",
        }}
      >
        © AniLite 2022
      </Typography>
    </div>
  );
}

export default Footer;
