import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { CustomDiv } from "../Components/CustomDiv";
import {
  CustomGenreButton,
  CustomOutlinedButton,
} from "../Components/CustomButton";
import colorGenerator from "../Functions/ColorGenerator";
import { useSelector } from "react-redux";
import { CustomFilterModal, CustomGenreModal } from "../Components/CustomModal";
import { CustomImg } from "../Components/AnimeListCarousel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function TopAnime() {
  const genreList = useSelector((state) => state.genreList);
  const { genres, error, loading } = genreList;
  const animeList = useSelector((state) => state.animeList);
  const { animes } = animeList;
  const [age, setAge] = React.useState("");
  const [columns, setColumns] = React.useState(
    window.innerWidth > 600 ? (window.innerWidth > 1600 ? 5 : 4) : 3
  );

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const dataDisplay = () => {
    window.innerWidth > 600
      ? window.innerWidth > 1600
        ? setColumns(5)
        : setColumns(4)
      : setColumns(3);
  };
  React.useEffect(() => {
    window.addEventListener("resize", dataDisplay);
  }, []);
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
              value={age}
              label="Filter By"
              onChange={handleChange}
              color="primary"
              sx={{
                color: "secondary.main",
                fontSize: "1rem",
              }}
            >
              <MenuItem value={10}>All</MenuItem>
              <MenuItem value={20}>Ongoing</MenuItem>
              <MenuItem value={30}>Completed</MenuItem>
            </Select>
          </FormControl>
          <div>
            {genres.map((item, id) => {
              let color = colorGenerator();
              return (
                <CustomGenreButton
                  key={id}
                  variant="outlined"
                  style={{
                    color: color,
                    borderColor: color,
                    // background:
                    //   genre === null
                    //     ? "transparent"
                    //     : genre.includes(item.name)
                    //     ? color
                    //     : "transparent",
                  }}
                  // onClick={(event) => handleClick(item.name, event)}
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
          {animes.slice(0, 20).map((item, id) => (
            <Grid key={id} item xs={1}>
              <Link to={`/anime-about/${item.slug}`}>
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

export default TopAnime;
