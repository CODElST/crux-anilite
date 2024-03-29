import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import HomePageCarousel from "../Components/HomePageCarousel";
import { AnimeCarousel } from "../Components/AnimeListCarousel";
import { useSelector } from "react-redux";
import { CustomIconButton } from "../Components/CustomButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopAnimeList from "../Components/TopAnimeList";
import { Link } from "react-router-dom";

export default function HomePage() {
  const animeList = useSelector((state) => state.animeList);
  const { animes, error, loading } = animeList;
  const data = [...animes];

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ delay: 0.3, duration: 1.5 }}
      style={{ minHeight: window.innerHeight - 300 }}
    >
      <HomePageCarousel />

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={11}>
          <Typography variant="h2" color="primary">
            Latest Anime
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Link to="top-anime">
            <CustomIconButton sx={{ float: "right" }}>
              <ArrowForwardIcon />
            </CustomIconButton>
          </Link>
        </Grid>
      </Grid>
      <div style={{ marginLeft: 2 }}>
        <AnimeCarousel
          data={data
            .sort((a, b) => (a.started < b.started ? 1 : -1))
            .slice(0, 15)}
        />
      </div>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={11}>
          <Typography variant="h2" color="primary">
            Popular Anime
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Link to="top-anime">
            <CustomIconButton sx={{ float: "right" }}>
              <ArrowForwardIcon />
            </CustomIconButton>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <TopAnimeList />
      </Grid>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={11}>
          <Typography variant="h2" color="primary">
            Top Anime Movie
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Link to="top-anime">
            <CustomIconButton sx={{ float: "right" }}>
              <ArrowForwardIcon />
            </CustomIconButton>
          </Link>
        </Grid>
      </Grid>
      <div style={{ marginLeft: 2, marginBottom: 16 }}>
        <AnimeCarousel
          data={data
            .filter((value) => {
              return value.type.includes("Anime (MOVIE)");
            })
            .sort((a, b) => (a.started < b.started ? 1 : -1))
            .slice(0, 15)}
        />
      </div>
    </motion.div>
  );
}
