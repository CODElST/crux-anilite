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
        console.log("genre=" + genre.join("+"));
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
      <Grid item xs={3}>
        <Box sx={{ backgroundColor: "secondary" }}>
          {genres.map((item, id) => {
            let color = colorGenerator();
            return webpage.pathname === "/" ? (
              ![
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
                "martial-arts",
                "mahou-shoujo",
                "mahou-shounen",
                "medical",
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
              ].includes(item.slug) ? (
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
        </Box>
      </Grid>

      <div>
        {genre === null || []
          ? data.slice(0, 20).map((item, id) => (
              <>
                <div key={id}>
                  <div key={id}>
                    <Link to={`/anime-about/${item.slug}`}>
                      <img
                        id="listitems"
                        style={{ height: "220px" }}
                        src={item.poster_image}
                        alt=""
                      />
                    </Link>
                    <p>
                      {item.name_en.length > 35
                        ? item.name_en.slice(0, 33) + "..."
                        : item.name_en}
                    </p>
                    <hr />
                    <p>{item.is_completed ? "Completed" : "Ongoing"}</p>
                  </div>
                  <div className=""></div>
                </div>
              </>
            ))
          : data.map((item, id) =>
              item.genres.map((name) =>
                genre.includes(name.name) ? (
                  <>
                    <>
                      <div key={id}>
                        <div key={id}>
                          <Link to={`/anime-about/${item.slug}`}>
                            <img
                              id="listitems"
                              style={{ height: "220px" }}
                              src={item.poster_image}
                              alt=""
                            />
                          </Link>
                          <p>
                            {item.name_en.length > 35
                              ? item.name_en.slice(0, 33) + "..."
                              : item.name_en}
                          </p>
                          <hr />
                          <p>{item.is_completed ? "Completed" : "Ongoing"}</p>
                        </div>
                        <div></div>
                      </div>
                    </>
                  </>
                ) : null
              )
            )}
      </div>
    </>
  );
}

export default TopAnimeList;
