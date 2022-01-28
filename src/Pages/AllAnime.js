import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  Grid,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { db } from "../IDB";

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
  const [classname, setClassname] = React.useState("hexagonDivUnselected");

  const [allAnime, setAllAnime] = React.useState([]);
  const [data, setData] = React.useState([]);
  const getAnimeData = async () => {
    const data = await db.anime.orderBy("name_en").toArray();
    setAllAnime(data);
    setData(data);
    setNoOfPages(Math.ceil(data.length / itemsPerPage));
  };

  const completeList = [...allAnime];

  const itemsPerPage = 10;

  const [page, setPage] = React.useState(1);

  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil(data.length / itemsPerPage)
  );

  const [activeIndexID, setActiveIndexID] = React.useState(["All"]);

  const handleChange = (event, value) => {
    setPage(value);
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
        return item.name_en[0]
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
          (el) => item.name_en[0].toLowerCase().includes(el)
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
    if (allAnime.length === 0) {
      getAnimeData();
    }
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
  }, [activeIndexID]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ padding: 2, mt: 6, minHeight: window.innerHeight - 300 }}
      >
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
                  <Link to={`/anime/${item.slug}`}>
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
                          src={item.poster_image}
                          alt={item.name_en}
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
                          {item.name_en}
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
          <Pagination
            id="pagination"
            count={noOfPages}
            siblingCount={0}
            boundaryCount={1}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            variant="outlined"
            color="primary"
            size="medium"
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Grid>
      </Grid>
    </>
  );
}
