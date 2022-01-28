import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { List, Grid, ListItem } from "@mui/material";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { getUserAnimeDataFirebase } from "../Firebase/Database";
import { db } from "../IDB";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{ color: "secondary.main" }}>
          <Typography color="secondary">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TabPanelList(data) {
  const [classname, setClassname] = React.useState("hexagonDivUnselected");

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {data?.map((item, id) => (
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
      </Grid>
    </Grid>
  );
}

export default function Dashboard() {
  const [value, setValue] = React.useState(null);
  const [animedata, setAnimedata] = React.useState();
  const [data, setData] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setData([]);
    newValue === 0
      ? Object.values(animedata[0])[0].map((item) => getAnimeBySlug(item[0]))
      : console.log();
    newValue === 1
      ? Object.values(animedata[1])[0].map((item) => getAnimeBySlug(item))
      : console.log();
    newValue === 2
      ? Object.values(animedata[2])[0].map((item) => getAnimeBySlug(item))
      : console.log();
  };

  const getUserAnimeData = async () => {
    let data = await getUserAnimeDataFirebase();
    setAnimedata(data);
  };

  const getAnimeBySlug = async (slug) => {
    const data = await db.anime.where("slug").equals(slug).toArray();
    setData((item) => item.concat(data));
  };

  React.useEffect(async () => {
    localStorage.getItem("user_uid") ? getUserAnimeData() : console.log(null);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 8,
        minHeight: window.innerHeight - 300,
        textAlign: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
          centered
          sx={{ color: "white" }}
        >
          <Tab label="Watched" />
          <Tab label="Watching" />
          <Tab label="Not Interested" />
        </Tabs>
      </Box>
      {value === null ? (
        <Typography variant="h3" color="primary">
          Select a Tab
        </Typography>
      ) : null}
      <TabPanel value={value} index={0}>
        {TabPanelList(data)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {TabPanelList(data)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {TabPanelList(data)}
      </TabPanel>
    </Box>
  );
}
