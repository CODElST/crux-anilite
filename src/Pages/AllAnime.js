import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { listAnime } from "../store/actions/animeActions";
import { ReactComponent as Hexagon } from "../Media/Hexagon.svg";
import hexagon from "../Media/hexagon.png";

const index = [
  "All",
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function TopAnimePage() {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(listAnime());
  // }, [dispatch]);
  const [classname, setClassname] = React.useState("hexagonDivUnselected");

  const animeList = useSelector((state) => state.animeList);
  const { animes, error, loading } = animeList;

  const [data, setData] = React.useState(
    animes.map((anime) => [anime.name_en, anime]).sort()
  );

  const completeList = [
    ...animes.map((anime) => [anime.name_en, anime]).sort(),
  ];

  const itemsPerPage = 10;

  const [page, setPage] = React.useState(1);

  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil(50 / itemsPerPage)
  );

  const [activeIndexID, setActiveIndexID] = React.useState(["All"]);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(listAnime((value - 1) * 10));
    window.scrollTo(0, 0);
  };

  const handleLetterClick = (event) => {
    if (event.currentTarget.innerText === "All") {
      const filteredAnime = completeList;
      setData(filteredAnime);
      setNoOfPages(Math.ceil(filteredAnime.length / itemsPerPage));
      setPage(1);
      setActiveIndexID([event.currentTarget.innerText]);
    } else if (
      event.currentTarget.innerText !== "All" ||
      "." ||
      "1" ||
      "2" ||
      "3" ||
      "4" ||
      "5" ||
      "6" ||
      "7" ||
      "8" ||
      "9" ||
      "0"
    ) {
      const filteredAnime = completeList.filter((item) => {
        return item[1].name_en[0]
          .toLowerCase()
          .includes(event.currentTarget.innerText.toLowerCase());
      });
      setData(filteredAnime);
      setNoOfPages(Math.ceil(filteredAnime.length / itemsPerPage));
      setPage(1);
      setActiveIndexID([event.currentTarget.innerText]);
    } else {
      const filteredAnime = completeList.filter((item) => {
        return ['".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"'].some(
          (el) => item[1].name_en[0].toLowerCase().includes(el)
        );
      });
      setData(filteredAnime);
      setNoOfPages(Math.ceil(filteredAnime.length / itemsPerPage));
      setPage(1);
      setActiveIndexID([event.currentTarget.innerText]);
    }
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    activeIndexID.map(
      (ID) => (document.getElementById(ID).style.backgroundColor = "#8B5CF6")
    );
    return () => {
      activeIndexID.map((ID) =>
        document.getElementById(ID) != null
          ? (document.getElementById(ID).style.backgroundColor = "")
          : null
      );
    };
  });

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2, mt: 6 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              overflowX: "scroll",
              flexDirection: "row",
              justifyContent: { xs: "start", md: "center" },
            }}
          >
            {index.map((letter, key) => (
              <motion.a
                key={key}
                id={letter}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.2 }}
                onClick={(event) => handleLetterClick(event)}
                style={{
                  borderRadius: 10,
                  paddingRight: 12,
                  paddingLeft: 12,
                  paddingTop: 8,
                  paddingBottom: 8,
                  cursor: "pointer",
                }}
              >
                <Typography variant="subtitle1" color="secondary">
                  {letter}
                </Typography>
              </motion.a>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List>
            {data
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item, id) => (
                <>
                  <Link to={`/anime-about/${item[1].slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.99 }}
                      onMouseEnter={() =>
                        (document.getElementById(item[1].slug).className =
                          "hexagonDiv")
                      }
                      onMouseLeave={() =>
                        (document.getElementById(item[1].slug).className =
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
                          src={item[1].poster_image}
                          alt={item[1].name_en}
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
                          {item[1].name_en}
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
                          id={item[1].slug}
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
