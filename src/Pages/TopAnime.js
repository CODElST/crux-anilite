import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { CustomDiv } from "../Components/CustomDiv";
import {
  CustomGenreButton,
  CustomOutlinedButton,
  CustomTextButton,
  CustomContainedButton,
} from "../Components/CustomButton";
import colorGenerator from "../Functions/ColorGenerator";
import { useSelector } from "react-redux";
import { CustomImg } from "../Components/AnimeListCarousel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

import { db } from "../IDB";

function TopAnime() {
  function CustomFilterModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <CustomOutlinedButton aria-label="menu" onClick={handleOpen}>
          <FilterAltIcon />
          Filter
        </CustomOutlinedButton>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 2000,
          }}
          sx={style.modal}
        >
          <Fade in={open}>
            <Stack direction={"column"} spacing={1} sx={style.buttonGroup}>
              <CustomTextButton
                onClick={handleChange}
                value={"rating"}
                sx={{ color: filter === "rating" ? "primary.main" : null }}
              >
                Rating
              </CustomTextButton>
              <CustomTextButton
                onClick={handleChange}
                value={"started"}
                sx={{ color: filter === "started" ? "primary.main" : null }}
              >
                Release
              </CustomTextButton>
              <CustomTextButton
                onClick={handleChange}
                value={"name_en"}
                sx={{ color: filter === "name_en" ? "primary.main" : null }}
              >
                Title
              </CustomTextButton>
            </Stack>
          </Fade>
        </Modal>
      </div>
    );
  }

  function CustomGenreModal({ genres }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <CustomOutlinedButton aria-label="menu" onClick={handleOpen}>
          <AddIcon />
          Genre
        </CustomOutlinedButton>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 2000,
          }}
          sx={style.modal}
        >
          <Fade in={open}>
            <div
              style={{
                padding: 16,
                textAlign: "center",
                overflowY: "scroll",
                // display: "flex",
                flex: 1,
                height: window.innerHeight,
              }}
            >
              {genres.map((item, id) => {
                let color = colorGenerator();
                return (
                  <CustomGenreButton
                    key={id}
                    variant="outlined"
                    onClick={(event) => handleClick(item.name, event)}
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
                  >
                    {item.name}
                  </CustomGenreButton>
                );
              })}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }

  const genreList = useSelector((state) => state.genreList);
  const { genres, error, loading } = genreList;
  const animeList = useSelector((state) => state.animeList);
  const { animes } = animeList;
  const [filter, setFilter] = React.useState("rating");
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState(
    window.innerWidth > 600 ? (window.innerWidth > 1600 ? 5 : 4) : 3
  );

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const dataDisplay = () => {
    window.innerWidth > 600
      ? window.innerWidth > 1600
        ? setColumns(5)
        : setColumns(4)
      : setColumns(3);
  };

  const getAnimeByGenre = async () => {
    const data =
      filter !== "name_en"
        ? await db.anime
            .orderBy(filter)
            .filter(({ genres }) => genre.every((i) => genres?.includes(i)))
            .reverse()
            .toArray()
        : await db.anime
            .orderBy(filter)
            .filter(({ genres }) => genre.every((i) => genres?.includes(i)))
            .toArray();
    setData(data);
  };

  // const getAnimeByGenre = async () => {
  //   const data = await db.anime
  //     .where("genres")
  //     .equals("Comedy")
  //     .sortBy(filter);
  //   setData(data);
  //   console.log(data);
  // };

  const [genre, setGenre] = React.useState([]);
  const handleClick = (name, event) => {
    genre == []
      ? setGenre(Array(name))
      : !genre.includes(name)
      ? setGenre(genre.concat(name))
      : setGenre(genre.filter((item) => item !== name));
  };

  React.useEffect(() => {
    window.addEventListener("resize", dataDisplay);
    getAnimeByGenre(genre);
  }, [genre, filter]);

  return (
    <Grid container spacing={2} sx={{ padding: 4, mt: 6 }}>
      <Grid item xs={12} md={4}>
        <CustomDiv sx={{ display: { xs: "none", md: "block" } }}>
          <FormControl
            sx={{
              m: 1,
              minWidth: 150,
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              color="primary"
              sx={{
                color: "secondary.main",
              }}
            >
              <FilterAltIcon />
              Filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter By"
              onChange={handleChange}
              color="primary"
              sx={{
                color: "secondary.main",
                fontSize: "1rem",
              }}
            >
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"started"}>Release</MenuItem>
              <MenuItem value={"name_en"}>Title</MenuItem>
            </Select>
          </FormControl>
          <div>
            {genres.map((item, id) => {
              let color = colorGenerator();
              return (
                <CustomGenreButton
                  key={id}
                  variant="outlined"
                  onClick={(event) => handleClick(item.name, event)}
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
                >
                  {item.name}
                </CustomGenreButton>
              );
            })}
          </div>
        </CustomDiv>
        <CustomDiv
          sx={{
            display: { xs: "block", md: "none" },
            padding: 1,
            position: "relative",
            top: "-50%",
          }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CustomFilterModal />
            <CustomGenreModal genres={genres} />
          </Stack>
        </CustomDiv>
      </Grid>

      <Grid item md={8}>
        <Grid container spacing={2} justifyContent={"center"} columns={columns}>
          {data.slice(0, 20).map((item, id) => (
            <Grid key={id} item xs={1}>
              <Link to={`/anime/${item.slug}`}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <CustomImg
                    id="listitems"
                    src={
                      item.poster_image ===
                      "https://media.kitsu.io/anime/poster_images/41071/original.jpeg"
                        ? "https://media.kitsu.io/anime/poster_images/13252/original.png?1597697512"
                        : item.poster_image
                    }
                    alt={item.name_en}
                  />
                  <Typography
                    variant="subtitle2"
                    textAlign={"center"}
                    color="secondary"
                  >
                    {id + 1}. {item.name_en}
                  </Typography>
                </motion.div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

const style = {
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    height: window.innerHeight,
    width: "100%",
    position: "absolute",
  },
  buttonGroup: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default TopAnime;
