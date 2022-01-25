import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "./AnimeListCarousel.css";
import {
  styled,
  Typography,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Box,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  HighlightOffOutlined,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

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
                <Link
                  to={
                    item.name_en
                      ? `/anime/${item.slug}`
                      : `/character/${item.slug}`
                  }
                >
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
                          {item.name_en || item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          {item.name
                            ? null
                            : item.is_completed
                            ? "Completed"
                            : "Ongoing"}
                        </Typography>
                      </div>
                    </Box>
                    <motion.div whileHover={{ opacity: 0 }}>
                      <CustomImg
                        id="listitems"
                        src={
                          item.image
                            ? item.image === ""
                              ? "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fc0f78fb-9444-4b33-849c-097988b52dc4/d6v4ofz-90d17e73-3600-4298-9f97-1d073ce674b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZjMGY3OGZiLTk0NDQtNGIzMy04NDljLTA5Nzk4OGI1MmRjNFwvZDZ2NG9mei05MGQxN2U3My0zNjAwLTQyOTgtOWY5Ny0xZDA3M2NlNjc0YjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MRQ4WpdkdCbQ8BuGG6a6f5d4fsv0G1ZJHBDXJ2fU2dg"
                              : item.image
                            : item.poster_image
                        }
                        alt={item.name_en || item.name}
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
                        {item.name_en || item.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="primary.light"
                        sx={{
                          wordWrap: "break-word",
                          height: "0.8rem",
                        }}
                      >
                        {item.name
                          ? null
                          : item.is_completed
                          ? "Completed"
                          : "Ongoing"}
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

function EpisodeCarousel({ episode_summary }) {
  const responsiveItems = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1260 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    smallDesktop: {
      breakpoint: { max: 1260, min: 1200 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    extraSmallDesktop: {
      breakpoint: { max: 1200, min: 950 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 950, min: 730 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    smallTablet: {
      breakpoint: { max: 730, min: 630 },
      items: 4,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 630, min: 539 },
      items: 3,
      partialVisibilityGutter: 50,
    },
    smallMobile: {
      breakpoint: { max: 539, min: 370 },
      items: 2,
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

  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState([]);

  const handleOpen = (Detail, event) => {
    setDetails(Detail);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const prevEpi = () => {
    let index = episode_summary.map((e) => e[0].Title).indexOf(details[0]) - 1;

    setDetails([
      episode_summary[index][0].Title,
      episode_summary[index][0].Summary,
      episode_summary[index][0].Thumbnail,
      episode_summary[index][0]["Air Date"],
    ]);
  };

  const nextEpi = () => {
    let index = episode_summary.map((e) => e[0].Title).indexOf(details[0]) + 1;

    setDetails([
      episode_summary[index][0].Title,
      episode_summary[index][0].Summary,
      episode_summary[index][0].Thumbnail,
      episode_summary[index][0]["Air Date"],
    ]);
  };
  return (
    <>
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
        {episode_summary.map((item, id) => {
          let Detail = [
            item[0].Title,
            item[0].Summary,
            item[0].Thumbnail,
            item[0]["Air Date"],
          ];
          return (
            <div key={id}>
              {item ? (
                <div onClick={(event) => handleOpen(Detail, event)}>
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
                          {item[0].Title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          sx={{ whiteSpace: "pre-line" }}
                        >
                          Episode {id + 1}
                          {"\n"}
                          {item[0]["Air Date"]}
                        </Typography>
                      </div>
                    </Box>
                    <motion.div whileHover={{ opacity: 0 }}>
                      <CustomImg
                        id="listitems"
                        src={
                          item[0].Thumbnail !== ""
                            ? item[0].Thumbnail
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8fX8lNuugRezDb-xv_aMZ09LyTX-jQoGssA&usqp=CAU"
                        }
                        alt={item.Title}
                        style={{
                          width: "100%",
                          height: "auto",
                          padding: 8,
                        }}
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
                        textAlign: "center",
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
                        {item[0].Title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="primary.light"
                        sx={{
                          wordWrap: "break-word",
                          // height: "0.8rem",
                          whiteSpace: "pre-line",
                        }}
                      >
                        Episode {id + 1}
                        {"\n"}
                        {item[0]["Air Date"]}
                      </Typography>
                    </div>
                  </Box>
                </div>
              ) : (
                <Skeleton variant="rectangular" />
              )}
            </div>
          );
        })}
      </Carousel>
      <Modal
        aria-labelledby="transition-modal-details"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 4000,
        }}
        // onKeyDown={handleClose}
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: { xs: "100%", md: "75%" },
          height: { xs: "100%", md: "75%" },
          backgroundImage:
            details[2] !== ""
              ? "url(" + details[2] + ")"
              : "url(http://www.100hdwallpapers.com/cs_size/3d_abstract/ios_13_ipados_dark_mode_blue-cs_size.jpg)",
          backgroundBlendMode: "soft-light",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Fade in={open}>
          <Box>
            <IconButton
              aria-label="Close"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <HighlightOffOutlined fontSize="large" />
            </IconButton>

            <Box
              sx={{
                textAlign: "center",
                marginTop: "10%",
                padding: 2,
                width: "100%",
              }}
            >
              <Typography variant="body1" color="primary">
                Aired: <span>{details[3]}</span>
              </Typography>
              <Typography variant="body1" color="secondary">
                {details[0]}
              </Typography>
              <p>{"\n"}</p>
              <Box sx={{ height: "75%", overflow: "scroll" }}>
                <Typography variant="body2" color="secondary">
                  {details[1]}
                </Typography>
              </Box>
            </Box>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {episode_summary &&
              episode_summary.map((e) => e[0].Title).indexOf(details[0]) - 1 !==
                -1 ? (
                <IconButton color="secondary" onClick={prevEpi}>
                  <ArrowBackIos color="secondary" />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <ArrowBackIos />
                </IconButton>
              )}

              {episode_summary &&
              episode_summary.map((e) => e[0].Title).indexOf(details[0]) + 1 !==
                episode_summary.length ? (
                <IconButton color="secondary" onClick={nextEpi}>
                  <ArrowForwardIos color="secondary" />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <ArrowForwardIos />
                </IconButton>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export { AnimeCarousel, PopularAnimeCarousel, CustomImg, EpisodeCarousel };
