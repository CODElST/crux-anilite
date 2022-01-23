import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./AnimeListCarousel.css";
import { styled, Typography, Hidden, Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

const CustomImg = styled("img")(({ theme }) => ({
  height: "250px",
  borderRadius: 5,
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
  loading: "lazy",
  [theme.breakpoints.down(1340)]: {
    height: "225px",
  },
  [theme.breakpoints.down(1260)]: {
    height: "210px",
  },
  [theme.breakpoints.down(1000)]: {
    height: "200px",
  },
  [theme.breakpoints.down(950)]: {
    height: "170px",
  },
  [theme.breakpoints.down(850)]: {
    height: "160px",
  },
  [theme.breakpoints.down(790)]: {
    height: "140px",
  },
  [theme.breakpoints.down(630)]: {
    height: "110px",
  },
  [theme.breakpoints.down(300)]: {
    height: "100px",
  },
}));

function AnimeCarousel({ data }) {
  const responsiveItems = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1260 },
      items: 7,
      partialVisibilityGutter: 10,
    },
    smallDesktop: {
      breakpoint: { max: 1260, min: 1200 },
      items: 7,
      partialVisibilityGutter: 10,
    },
    extraSmallDesktop: {
      breakpoint: { max: 1200, min: 950 },
      items: 6,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 950, min: 730 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    smallTablet: {
      breakpoint: { max: 730, min: 630 },
      items: 4,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 630, min: 539 },
      items: 4,
      partialVisibilityGutter: 50,
    },
    smallMobile: {
      breakpoint: { max: 539, min: 370 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    extraSmallMobile: {
      breakpoint: { max: 370, min: 290 },
      items: 2,
      partialVisibilityGutter: 70,
    },
    extraExtraSmallMobile: {
      breakpoint: { max: 290, min: 0 },
      items: 2,
      partialVisibilityGutter: 50,
    },
  };

  return (
    <React.Fragment>
      <Carousel
        responsive={responsiveItems}
        infinite={false}
        centerMode={false}
        ssr
        swipeable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "smallTablet",
          "mobile",
          "smallMobile",
          "extraSmallMobile",
          "extraExtraSmallMobile",
        ]}
        partialVisbile={true}
      >
        {Array.from(data).map((item, id) => (
          <div key={id}>
            {item ? (
              <div>
                <Link to={`/anime/${item.slug}`}>
                  <div>
                    <Box sx={{ display: { md: "block", xs: "none" } }}>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "80%",
                          textAlign: "center",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Typography variant="body2" color="secondary">
                          {item.name_en}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          {item.is_completed ? "Completed" : "Ongoing"}
                        </Typography>
                      </div>
                    </Box>
                    <motion.div whileHover={{ opacity: 0 }}>
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
                    </motion.div>
                  </div>
                  <Box sx={{ display: { md: "none", xs: "block" } }}>
                    <div
                      style={{
                        width: "75%",
                        position: "relative",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        sx={{
                          wordWrap: "break-word",
                          height: "1.55rem",
                          overflow: "scroll",
                        }}
                      >
                        {item.name_en}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="primary.light"
                        sx={{
                          wordWrap: "break-word",
                          height: "0.8rem",
                        }}
                      >
                        {item.is_completed ? "Completed" : "Ongoing"}
                      </Typography>
                    </div>
                  </Box>
                </Link>
              </div>
            ) : (
              <Skeleton variant="rectangular" />
            )}
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
}

function PopularAnimeCarousel({ data }) {
  const responsiveItems = {
    extraLargeDesktop: {
      breakpoint: { max: 1700, min: 1530 },
      items: 5,
      partialVisibilityGutter: 10,
    },
    largeDesktop: {
      breakpoint: { max: 1530, min: 1400 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1260 },
      items: 7,
      partialVisibilityGutter: 10,
    },
    smallDesktop: {
      breakpoint: { max: 1260, min: 1200 },
      items: 7,
      partialVisibilityGutter: 10,
    },
    extraSmallDesktop: {
      breakpoint: { max: 1200, min: 950 },
      items: 6,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 950, min: 730 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    smallTablet: {
      breakpoint: { max: 730, min: 630 },
      items: 4,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 630, min: 539 },
      items: 4,
      partialVisibilityGutter: 50,
    },
    smallMobile: {
      breakpoint: { max: 539, min: 370 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    extraSmallMobile: {
      breakpoint: { max: 370, min: 290 },
      items: 2,
      partialVisibilityGutter: 70,
    },
    extraExtraSmallMobile: {
      breakpoint: { max: 290, min: 0 },
      items: 2,
      partialVisibilityGutter: 50,
    },
  };

  return (
    <React.Fragment style={{ alignSelf: "center" }}>
      <Carousel
        responsive={responsiveItems}
        infinite={false}
        centerMode={false}
        ssr
        swipeable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "smallTablet",
          "mobile",
          "smallMobile",
          "extraSmallMobile",
          "extraExtraSmallMobile",
        ]}
        partialVisbile={true}
      >
        {Array.from(data).map((item, id) => (
          <div key={id}>
            <div>
              <Link to={`/anime/${item.slug}`}>
                <div>
                  <Box sx={{ display: { md: "block", xs: "none" } }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "80%",
                        textAlign: "center",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Typography variant="body2" color="secondary">
                        {item.name_en}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {item.is_completed ? "Completed" : "Ongoing"}
                      </Typography>
                    </div>
                  </Box>
                  <motion.div whileHover={{ opacity: 0 }}>
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
                  </motion.div>
                </div>
                <Box sx={{ display: { md: "none", xs: "block" } }}>
                  <div
                    style={{
                      width: "75%",
                      position: "relative",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="secondary"
                      sx={{
                        wordWrap: "break-word",
                        height: "1.55rem",
                        overflow: "scroll",
                      }}
                    >
                      {item.name_en}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="primary.light"
                      sx={{
                        wordWrap: "break-word",
                        height: "0.8rem",
                      }}
                    >
                      {item.is_completed ? "Completed" : "Ongoing"}
                    </Typography>
                  </div>
                </Box>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
}

export { AnimeCarousel, PopularAnimeCarousel, CustomImg };
