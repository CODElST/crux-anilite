import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Grid, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listAnime } from "../store/actions/animeActions";
import { ReactComponent as Hexagon } from "../Media/Hexagon.svg";
import hexagon from "../Media/hexagon.png";
import { useLocation, useSearchParams } from "react-router-dom";
import { db } from "../IDB";

export default function SearchPage() {
  let [params] = useSearchParams();
  let searchWord = params.get("search");
  const [classname, setClassname] = React.useState("hexagonDivUnselected");
  const [filteredAnime, setFilteredAnime] = React.useState([]);
  const [filteredCharacter, setFilteredCharacter] = React.useState([]);

  const getAnimeBySearch = async (key) => {
    console.log(key);
    const data = await db.anime
      .orderBy("name_en")
      .filter(({ name_en }) =>
        name_en.toLowerCase().includes(key.toLowerCase())
      )
      .toArray();
    setFilteredAnime(data);
  };

  const getCharacterBySearch = async (key) => {
    const data = await db.character
      .orderBy("name")
      .filter(({ name }) => name.toLowerCase().includes(key.toLowerCase()))
      .toArray();
    setFilteredCharacter(data);
  };

  React.useEffect(() => {
    getAnimeBySearch(searchWord);
    getCharacterBySearch(searchWord);
  }, [searchWord]);

  return filteredAnime.concat(filteredCharacter).length === 0 ? null : (
    <>
      <Grid container spacing={2} sx={{ padding: 2, mt: 6 }}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: { xs: "center", md: "start" } }}
          >
            <Typography variant="h3" color="secondary">
              Search Result(s) for
            </Typography>
            <Typography variant="h3" color="primary">
              {searchWord}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <List>
            {filteredAnime.concat(filteredCharacter).map((item, id) => (
              <>
                <Link
                  to={
                    item.name_en
                      ? `/anime/${item.slug}`
                      : `/character/${item.slug}`
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    onMouseEnter={() =>
                      (document.getElementById(item.slug).className =
                        "hexagonDiv")
                    }
                    onMouseLeave={() =>
                      (document.getElementById(item.slug).className =
                        "hexagonDivUnselected")
                    }
                    className="tileDiv"
                  >
                    <ListItem
                      key={id}
                      className="listitemAllAnime"
                      sx={{
                        background: "primary.background",
                        width: "100%",
                        borderRadius: 2,
                        my: 1,
                      }}
                    >
                      <img
                        src={item.poster_image || item.image}
                        alt={item.name_en || item.name}
                        style={{
                          maxHeight: "7rem",
                          borderRadius: 4,
                          zIndex: 1,
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        color="secondary"
                        sx={{
                          position: "relative",
                          left: "45%",
                          transform: "translateX(-50%)",
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                          zIndex: 1,
                        }}
                      >
                        {item.name_en || item.name}
                      </Typography>

                      <motion.div
                        whileHover={{ x: 20 }}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: 1,
                        }}
                      >
                        <NavigateNextIcon
                          color="primary"
                          sx={{
                            position: "relative",
                            left: "90%",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </motion.div>
                      <div
                        id={item.slug}
                        className={classname}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "110%",

                          zIndex: 0,
                          left: 0,
                        }}
                      />
                    </ListItem>
                  </motion.div>
                </Link>
              </>
            ))}
          </List>
        </Grid>
        <Hexagon />
      </Grid>
    </>
  );
}
