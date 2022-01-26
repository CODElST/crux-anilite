import {
  Stack,
  Card,
  Box,
  Typography,
  Grid,
  Button,
  Rating,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listAnimeDetail } from "../store/actions/animeActions";
import StarIcon from "@mui/icons-material/Star";
import SkeletonLoading from "../Components/SkeletonLoading";
import Masonry from "@mui/lab/Masonry";
import {
  CustomGenreButton,
  CustomTextButton,
} from "../Components/CustomButton";
import {
  AnimeCarousel,
  EpisodeCarousel,
} from "../Components/AnimeListCarousel";
import {
  addWatchedFirebase,
  addWatchingFirebase,
  addNotInterestedFirebase,
  deleteWatchedFirebase,
  deleteWatchingFirebase,
  deleteNotInterestedFirebase,
  getUserAnimeDataFirebase,
} from "../Firebase/Database";
import { loggedIn } from "../Firebase/GoogleAuth";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Too Good",
  5: "Too Good+",
  5.5: "Excellent",
  6: "Excellent+",
  6.5: "Superb",
  7: "Superb+",
  7.5: "Outstanding",
  8: "Outstanding+",
  8.5: "Weebs Approve",
  9: "Otakus Approve",
  9.5: "God Level",
  10: "Beyond God Level",
};

export default function Anime(props) {
  const [display, setDisplay] = React.useState(false);
  const { animeSlug } = useParams();
  const animeDetail = useSelector((state) => state.animeDetail);
  const { anime, error, loading } = animeDetail;
  const animeList = useSelector((state) => state.animeList);
  const { animes } = animeList;
  const dispatch = useDispatch();

  const [columns, setColumns] = React.useState(window.innerWidth > 740 ? 3 : 2);
  const masonryColumn = () => {
    window.innerWidth > 740 ? setColumns(3) : setColumns(2);
  };

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const [animedata, setAnimedata] = React.useState();
  const [status, setStatus] = React.useState(null);

  const getUserAnimeData = async () => {
    let data = await getUserAnimeDataFirebase();
    setAnimedata(data);
    if (
      Object.values(data[0])[0].filter((item) => item[0] === anime.slug)
        .length !== 0
    ) {
      setStatus("Watched");
      setValue(
        Object.values(data[0])[0].filter((item) => item[0] === anime.slug)[0][1]
          .rating
      );
    } else if (
      Object.values(data[1])[0].filter((item) => item === anime.slug).length !==
      0
    ) {
      setStatus("Watching");
    } else if (
      Object.values(data[2])[0].filter((item) => item === anime.slug).length !==
      0
    ) {
      setStatus("Not Interested");
    } else {
      setStatus(null);
    }
  };

  const handleWatchedClick = (rating) => {
    addWatchedFirebase(anime.slug, rating);
    deleteWatchingFirebase(anime.slug);
    deleteNotInterestedFirebase(anime.slug);
    setStatus("Watched");
  };

  const handleWatchingClick = () => {
    addWatchingFirebase(anime.slug);
    deleteWatchedFirebase(anime.slug);
    deleteNotInterestedFirebase(anime.slug);
    setStatus("Watching");
    setValue(0);
  };

  const handleNotInterestedClick = () => {
    addNotInterestedFirebase(anime.slug);
    deleteWatchingFirebase(anime.slug);
    deleteWatchedFirebase(anime.slug);
    setStatus("Not Interested");
    setValue(0);
  };

  React.useEffect(async () => {
    if (anime.slug !== animeSlug) {
      dispatch(listAnimeDetail(animeSlug));
    }
    setDisplay(true);
    localStorage.getItem("user_uid") ? getUserAnimeData() : console.log(null);
    window.addEventListener("resize", masonryColumn);
    return () => window.removeEventListener("resize", masonryColumn);
  }, [dispatch, animeSlug, anime.slug]);

  return loading === true ? (
    <SkeletonLoading />
  ) : error ? (
    <h1>Error: {error}</h1>
  ) : (
    { display } && (
      <React.Fragment>
        <div
          style={{
            background: "#222222",
            minHeight: window.innerHeight - 300,
          }}
        >
          <div
            style={{
              position: "fixed",
              height: window.innerHeight,
              width: window.innerWidth,
              top: 0,
              background: "#222222",
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "100%",
                height: "100%",
              }}
            >
              <img
                id="animeAboutCoverImageGradient"
                src={anime.cover_image}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  opacity: 0.5,
                }}
              />
            </Box>
            <Box
              sx={{
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                display: { xs: "block", md: "none" },
              }}
            >
              <img
                id="animeAboutCoverImageGradient"
                src={anime.cover_image}
                alt=""
                style={{
                  height: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  opacity: 0.5,
                }}
              />
            </Box>
          </div>
          <Box
            style={{
              position: "relative",
              marginTop: "50vh",
              transform: "translateY(-50%)",
              width: "100%",
              zIndex: 1,
            }}
          >
            <Grid
              container
              sx={{
                padding: 2,
                mt: 4,
                // top: { xs: "-50vh", md: "-50vh" },
                // transform: "translateY(-50%)",
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
          </Box>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: 60,
              backgroundImage:
                "linear-gradient(to top, #222222 50%, transparent)",
            }}
          >
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12} sm={3} md={3}>
                <Box
                  sx={{
                    width: { xs: "40%", sm: "90%", md: "50%" },
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <img
                    src={anime.poster_image}
                    alt=""
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Box>
                <div
                  style={{
                    position: "relative",
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  {display &&
                    anime.genres.map((item, id) => {
                      return (
                        <CustomGenreButton
                          key={id}
                          variant="outlined"
                          color="secondary"
                        >
                          {item.name}
                        </CustomGenreButton>
                      );
                    })}
                </div>
              </Grid>
              <Grid item xs={12} sm={9} md={6}>
                <Masonry columns={columns} spacing={1}>
                  <Card
                    sx={{ background: "#B847CB", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      English Name
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.name_en}
                    </Typography>
                  </Card>

                  <Card
                    sx={{ background: "#474CCB", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Japanese Name
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.name_jp}
                    </Typography>
                  </Card>

                  <Card
                    sx={{ background: "#8D1697", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Format
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.type}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#AE4141", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Status
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.is_completed ? "Completed" : "Ongoing"}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#5400BE", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Episodes
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.num_of_eps}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#16973A", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Aired
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.started === "1111-11-11"
                        ? "Not yet Aired"
                        : anime.started}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#B88400", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Studio
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.studio}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#0AA2D2", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Ended
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.ended === "1111-11-11"
                        ? "Not yet Aired"
                        : anime.ended}
                    </Typography>
                  </Card>

                  <Card
                    sx={{ background: "#FF0000", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Rank
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.popularity_rank}
                      <br />
                      (All Anime)
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#38C8D1", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Rating
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.rating}
                    </Typography>
                  </Card>

                  <Card
                    sx={{ background: "#5257D7", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Age Rating
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.age_rating}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#5257D7", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      Director
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      {anime.directors}
                    </Typography>
                  </Card>
                  <Card
                    sx={{ background: "#B88400", padding: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="secondary">
                      User Rating
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      99.99
                    </Typography>
                  </Card>
                </Masonry>
              </Grid>
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                {localStorage.getItem("user_uid") ? (
                  <>
                    <Typography variant="h3" color="primary">
                      Watched it yet?
                    </Typography>
                    <Stack
                      direction={"column"}
                      spacing={2}
                      sx={{
                        padding: 2,
                        justifySelf: "center",
                      }}
                    >
                      <Button
                        variant="text"
                        onClick={() => handleWatchedClick(null)}
                        sx={{
                          color:
                            status === "Watched" ? "primary.main" : "white",
                        }}
                      >
                        Watched
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleWatchingClick()}
                        sx={{
                          color:
                            status === "Watching" ? "primary.main" : "white",
                        }}
                      >
                        Watching
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleNotInterestedClick()}
                        sx={{
                          color:
                            status === "Not Interested"
                              ? "primary.main"
                              : "white",
                        }}
                      >
                        Not Interested
                      </Button>
                      <Rating
                        name="customized-10"
                        defaultValue={0}
                        size="large"
                        precision={0.5}
                        max={10}
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          handleWatchedClick(newValue);
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55, color: "white" }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2, color: "secondary.main" }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Stack>
                    {animedata && console.log(status)}
                  </>
                ) : null}
              </Grid>
              <Box sx={{ padding: 2, display: { xs: "block", md: "none" } }}>
                <Grid item xs={12}>
                  <Typography variant="h2" color="primary">
                    Summary
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="secondary">
                    {anime.about}
                  </Typography>
                </Grid>
              </Box>
              <Grid item xs={12}>
                <Typography variant="h2" color="primary">
                  Episodes
                </Typography>
              </Grid>
            </Grid>
            {display && (
              <EpisodeCarousel episode_summary={anime.episode_summary} />
            )}
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="primary">
                  Characters
                </Typography>
              </Grid>
            </Grid>
            {display && <AnimeCarousel data={anime.characters} />}
          </div>
        </div>
      </React.Fragment>
    )
  );
}
