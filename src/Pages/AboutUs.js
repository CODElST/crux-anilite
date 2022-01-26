import React from "react";
import { Grid, CardMedia, Avatar, Stack, Typography } from "@mui/material";
import aarush_dp from "../Media/Aarush_dp.jpg";
import shivansh_dp from "../Media/Shivansh_dp.jpeg";
import shivansh_bg from "../Media/Shivansh_bg.jpg";
import { CustomDiv } from "../Components/CustomDiv";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

const DisplayCard = (props) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ delay: 0.3, duration: 1.5 }}
      style={{ minHeight: window.innerHeight - 300 }}
    >
      <CustomDiv sx={{ my: 4, mx: 4, padding: 0, maxWidth: "500px" }}>
        <CardMedia
          component="img"
          image={props.bgImage}
          style={{ borderRadius: 20 }}
        />
        <div>
          <Avatar
            alt={props.name}
            src={props.dp}
            style={{
              height: 120,
              width: 120,
              marginTop: -60,
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
          />
          <Stack
            spacing={1}
            direction={"column"}
            sx={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mt: 2,
              padding: 1,
            }}
          >
            <Typography variant="h4" color="secondary">
              {props.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ fontWeight: 300 }}
            >
              {props.skills}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary"
              fontWeight={700}
              sx={{ paddingTop: 4 }}
            >
              Connect with me on
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>
                <a
                  href={props.github}
                  target="_blank"
                  style={{ color: "white" }}
                >
                  <GitHubIcon style={{ height: 40, width: 40, margin: 10 }} />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <a href={props.linkedin} target="_blank">
                  <LinkedInIcon
                    style={{
                      height: 50,
                      width: 50,
                      margin: 10,
                      color: "white",
                    }}
                  />
                </a>
              </motion.div>
            </div>
          </Stack>
        </div>
      </CustomDiv>
    </motion.div>
  );
};

function AboutUs() {
  return (
    <Grid container sx={{ marginTop: 8 }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        <DisplayCard
          name={"Shivansh Shukla"}
          dp={shivansh_dp}
          bgImage={shivansh_bg}
          skills={
            "Python | Django | Django REST Framework | PostgreSQL | API Design | Caching | Scripting"
          }
          github={"https://github.com/hsnavihS"}
          linkedin={"https://www.linkedin.com/in/shivansh-shukla-611769201/"}
        />
        <DisplayCard
          name={"Aarush Sinha"}
          dp={aarush_dp}
          bgImage={"https://wallpapercave.com/wp/wp4720359.jpg"}
          skills={
            "Javascript | ReactJS | Material UI | Tailwind CSS | Framer Motion | UI Design"
          }
          github={"https://github.com/CODElST"}
          linkedin={"https://www.linkedin.com/in/aarush-sinha-66a790201/"}
        />
      </Grid>
    </Grid>
  );
}

export default AboutUs;
