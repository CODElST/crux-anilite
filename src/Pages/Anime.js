import { Button, Card, Box, Typography, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listAnimeDetail } from "../store/actions/animeActions";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Anime() {
  const [display, setDisplay] = React.useState(false);
  const { animeSlug } = useParams();
  const animeDetail = useSelector((state) => state.animeDetail);
  const { anime, error, loading } = animeDetail;

  const animeList = useSelector((state) => state.animeList);
  const { animes } = animeList;
  let data = [...animes];
  const dispatch = useDispatch();

  const [opacity, setOpacity] = React.useState(1);
  const listenScrollEvent = () => {
    if (window.scrollY > 5) {
      let opacity = window.scrollY / (0.5 * window.innerHeight);

      setOpacity(1 - opacity);
    } else {
      setOpacity(1);
    }
  };

  React.useEffect(() => {
    if (anime.slug !== animeSlug) {
      dispatch(listAnimeDetail(animeSlug));
    }
    setDisplay(true);
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [dispatch, animeSlug]);

  return loading === true ? (
    <Loader />
  ) : error ? (
    <h1>Error: {error}</h1>
  ) : (
    { display } && (
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <img
            id="animeAboutCoverImageGradient"
            src={anime.cover_image}
            alt=""
            style={{
              position: "relative",
              height: window.innerHeight,
              width: "100%",
              opacity: 0.5,
            }}
          />
        </Box>
        <Grid
          container
          sx={{
            padding: 2,
            mt: 4,
            top: { xs: "50vh", md: "-50vh" },
            transform: "translateY(-50%)",
            position: "relative",
          }}
        >
          <Grid item xs={1} />
          <Grid item xs={10} textAlign={"center"}>
            <Typography
              variant="h1"
              color="primary"
              sx={{ textShadow: "1px 1px 2px black" }}
            >
              {anime.name_en}
            </Typography>
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={0} md={1} />
          <Grid item xs={12} md={10} textAlign={"center"}>
            <Typography
              variant="body1"
              color="secondary"
              sx={{
                textShadow: "1px 1px 2px black",
                display: { xs: "none", md: "block" },
              }}
            >
              {anime.about}
            </Typography>
          </Grid>
          <Grid item xs={0} md={1} />
        </Grid>
        <div></div>

        <div className="grid grid-cols-12 gap-4 relative top-40 mb-60 w-full ">
          <div className="col-span-2" />
          {/* <div className="col-span-3">
            <img className="w-9/12" src={anime.poster_image} alt="" />
          </div>
          <div className="col-span-1" /> */}
          <div
            className="col-span-8 rounded-xl"
            // style={{
            //   backgroundImage:
            //     "linear-gradient(to bottom, rgba(0,0,0,0.6)0%, rgba(0,0,0,0.3)70%, transparent)",
            // }}
          >
            <p
              className="text-purple-500 font-roboto text-6xl font-bold"
              style={{
                textShadow: "2px 2px 5px black",
                opacity: opacity,
                letterSpacing: "1px",
              }}
            ></p>

            <div className="col-span-2" />
            <div className="col-span-2" />
            <div className="col-span-8 rounded-xl" style={{ zIndex: 2 }}>
              <div className="max-h-96 overflow-y-scroll" style={{ zIndex: 2 }}>
                <p
                  className="text-white font-roboto text-lg font-normal whitespace-pre-wrap "
                  style={{
                    textShadow: "1px 1px 2px black",
                    opacity: opacity,
                    zIndex: 2,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}
