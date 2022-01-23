import { Button, Grid, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listGenres } from "../store/actions/genreActions";
import { listAnime } from "../store/actions/animeActions";
import { useLocation } from "react-router";
import Loader from "./Loader";
import { CustomGenreButton } from "./CustomButton";
import colorGenerator from "../Functions/ColorGenerator";
import { CustomDiv, CustomGenreDiv } from "./CustomDiv";
import { PopularAnimeCarousel } from "./AnimeListCarousel";

const notToIncludeGenre = [
  "cars",
  "demons",
  "documentary",
  "family",
  "friendship",
  "food",
  "anime-influenced",
  "Cooking",
  "dementia",
  "doujinshi",
  "gender-bender",
  "kids",
  "mature",
  "tokusatsu",
  "workplace",
  "yaoi",
  "youth",
  "yuri",
  "historical",
  "game",
  "law",
  "mahou-shoujo",
  "mahou-shounen",
  "martial-arts",
  "medical",
  "military",
  "parody",
  "police",
  "political",
  "racing",
  "samurai",
  "school",
  "shoujo-ai",
  "shounen-ai",
  "space",
  "super-power",
  "supernatural",
  "vampire",
  "zombies",
];

function TopAnimeList(props) {
  const webpage = useLocation();
  const [genre, setGenre] = React.useState(null);
  const handleClick = (name, event) => {
    genre === null
      ? setGenre(Array(name))
      : !genre.includes(name)
      ? setGenre(genre.concat(name))
      : setGenre(genre.filter((item) => item !== name));
  };
  const genreList = useSelector((state) => state.genreList);
  const { genres, error, loading } = genreList;
  const animeList = useSelector((state) => state.animeList);
  const { animes } = animeList;
  const data = [...animes];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (genres.length === 0) {
      dispatch(listGenres());
    }
    if (genre !== null) {
      if (genre !== []) {
        dispatch(listAnime("genre=" + genre.join("+")));
      } else {
        dispatch(listAnime());
      }
    }
  }, [dispatch, genres.length]);
  console.log(genre);

  return loading === true ? (
    <Loader />
  ) : error ? (
    <h1>Error: {error}</h1>
  ) : (
    <>
      <Grid item xs={12} desktop={4}>
        <CustomDiv
          sx={{ display: { xs: "none", desktop: "block" }, marginLeft: 2 }}
        >
          {genres.map((item, id) => {
            let color = colorGenerator();
            return webpage.pathname === "/" ? (
              !notToIncludeGenre.includes(item.slug) ? (
                <CustomGenreButton
                  key={id}
                  variant="outlined"
                  style={{
                    color:
                      genre === null
                        ? color
                        : genre.includes(item.name)
                        ? "black"
                        : color,
                    borderColor: color,
                    background:
                      genre === null
                        ? "transparent"
                        : genre.includes(item.name)
                        ? color
                        : "transparent",
                  }}
                  onClick={(event) => handleClick(item.name, event)}
                >
                  {item.name}
                </CustomGenreButton>
              ) : null
            ) : (
              <Button
                key={id}
                className="m-1 py-1 opacity-80 hover:opacity-100"
                variant="outlined"
                style={{ borderRadius: 20, color: color, borderColor: color }}
                onClick={(event) => handleClick(item.name, event)}
              >
                <p className="font-roboto font-extralight ">{item.name}</p>
              </Button>
            );
          })}
        </CustomDiv>
        <CustomGenreDiv>
          {genres.map((item, id) => {
            let color = colorGenerator();
            return webpage.pathname === "/" ? (
              !notToIncludeGenre.includes(item.slug) ? (
                <CustomGenreButton
                  key={id}
                  variant="outlined"
                  style={{
                    color:
                      genre === null
                        ? color
                        : genre.includes(item.name)
                        ? "black"
                        : color,
                    borderColor: color,
                    background:
                      genre === null
                        ? "transparent"
                        : genre.includes(item.name)
                        ? color
                        : "transparent",
                  }}
                  onClick={(event) => handleClick(item.name, event)}
                >
                  {item.name}
                </CustomGenreButton>
              ) : null
            ) : (
              <Button
                key={id}
                className="m-1 py-1 opacity-80 hover:opacity-100"
                variant="outlined"
                style={{ borderRadius: 20, color: color, borderColor: color }}
                onClick={(event) => handleClick(item.name, event)}
              >
                <p className="font-roboto font-extralight ">{item.name}</p>
              </Button>
            );
          })}
        </CustomGenreDiv>
      </Grid>
      <Grid item desktop={8} xs={12}>
        <PopularAnimeCarousel data={data} />
      </Grid>
    </>
  );
}

export default TopAnimeList;
