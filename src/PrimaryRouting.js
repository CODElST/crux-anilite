import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listAnime } from "./store/actions/animeActions";
import { listCharacter } from "./store/actions/characterActions";
import Loader from "./Components/Loader";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Functions/ScrollToTop";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import AllAnime from "./Pages/AllAnime";
import TopAnime from "./Pages/TopAnime";
import Anime from "./Pages/Anime";
import Character from "./Pages/Character";
import SkeletonLoading from "./Components/SkeletonLoading";

export default function PrimaryRouting() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listAnime("sort=rating"));
    dispatch(listCharacter());
  }, [dispatch]);

  const animeList = useSelector((state) => state.animeList);
  const { animes, error, loading } = animeList;
  const [display, setDisplay] = React.useState(true);
  setTimeout(() => {
    setDisplay(false);
  }, 10050);

  return loading === true ? (
    <>
      <SkeletonLoading display={display} />
      <Loader display={display} />
    </>
  ) : error ? (
    <h1 style={{ color: "white" }}>Error: {error}</h1>
  ) : (
    <ScrollToTop>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="all-anime" element={<AllAnime />} />
          <Route path="top-anime" element={<TopAnime />} />
          <Route path="anime" element={<Anime />}>
            <Route path=":animeSlug" element={<Anime />} />
          </Route>
          <Route path="character" element={<Character />}>
            <Route path=":characterSlug" element={<Character />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </ScrollToTop>
  );
}