import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listAnime } from "./store/actions/animeActions";
import { listCharacter } from "./store/actions/characterActions";
import { listGenres } from "./store/actions/genreActions";
import Loader from "./Components/Loader";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./Functions/ScrollToTop";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import AllAnime from "./Pages/AllAnime";
import TopAnime from "./Pages/TopAnime";
import Anime from "./Pages/Anime";
import Character from "./Pages/Character";
import SearchPage from "./Pages/SearchPage";
import Dashboard from "./Pages/Dashboard";
import { SkeletonLoading } from "./Components/SkeletonLoading";
import { bulkAddAnime } from "./IDB/animeStore/animeActions";
import { bulkAddCharacters } from "./IDB/characterStore/characterActions";
import { bulkAddGenres } from "./IDB/genreStore/genreActions";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDash from "./Pages/UserDash";

export default function PrimaryRouting() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listAnime("sort=rating"));
    dispatch(listCharacter());
    dispatch(listGenres());
  }, [dispatch]);

  const animeList = useSelector((state) => state.animeList);
  const { animes, error, loading } = animeList;
  const characterList = useSelector((state) => state.characterList);
  const { characters } = characterList;
  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;

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
    (animes !== [] ? bulkAddAnime(animes) : null,
    characters !== [] ? bulkAddCharacters(characters) : null,
    genres !== [] ? bulkAddGenres(genres) : null,
    (
      <ScrollToTop>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about-us" element={<Login />} />
            <Route path="all-anime" element={<AllAnime />} />
            <Route path="top-anime" element={<TopAnime />} />
            <Route path="anime" element={<Anime />}>
              <Route path=":animeSlug" element={<Anime />} />
            </Route>
            <Route path="character" element={<Character />}>
              <Route path=":characterSlug" element={<Character />} />
            </Route>
            <Route path="search" element={<SearchPage />} />
            <Route path="dash" element={<UserDash />} />
            {localStorage.getItem("user_uid") ? (
              <Route path="dashboard" element={<Dashboard />} />
            ) : (
              <Route path="dashboard" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
        <Footer />
      </ScrollToTop>
    ))
  );
}
