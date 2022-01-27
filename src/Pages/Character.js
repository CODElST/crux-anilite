import React from "react";
import { useHistory } from "react-router";
import { Box, Grid, Typography, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../Components/Footer";
import { listCharacterDetail } from "../store/actions/characterActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { CustomTextButton } from "../Components/CustomButton";
import { CharacterSkeletonLoading } from "../Components/SkeletonLoading";

function Character() {
  const [display, setDisplay] = React.useState(false);
  let { characterSlug } = useParams();
  console.log(characterSlug);
  const characterDetail = useSelector((state) => state.characterDetail);
  const { character, error, loading } = characterDetail;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (character.slug !== characterSlug) {
      dispatch(listCharacterDetail(characterSlug));
    }
    setDisplay(true);
  }, [dispatch, characterSlug]);

  const navigate = useNavigate();

  let desc = null;
  const description = () => {
    desc = character.about.replace(/<br>/g, "\n");
    desc = desc.replace(/<span class="spoiler">/g, "");
    desc = desc.replaceAll("</span>", "");
    desc = desc.replaceAll("<p>", "");
    desc = desc.replaceAll("</p>", "");
    return desc;
  };

  return loading === true ? (
    <CharacterSkeletonLoading />
  ) : error ? (
    <h1 style={{ color: "white" }}>Error: {error}</h1>
  ) : (
    { display } && (
      <>
        <Grid
          container
          spacing={2}
          sx={{ padding: 2, mt: 4, minHeight: window.innerHeight - 300 }}
        >
          <Grid item xs={12}>
            <CustomTextButton onClick={() => navigate(-1)}>
              <ArrowBackIcon /> Go Back
            </CustomTextButton>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h2" color="secondary">
              {character.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <img
              style={{ borderRadius: 8 }}
              src={
                character.image === ""
                  ? "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fc0f78fb-9444-4b33-849c-097988b52dc4/d6v4ofz-90d17e73-3600-4298-9f97-1d073ce674b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZjMGY3OGZiLTk0NDQtNGIzMy04NDljLTA5Nzk4OGI1MmRjNFwvZDZ2NG9mei05MGQxN2U3My0zNjAwLTQyOTgtOWY5Ny0xZDA3M2NlNjc0YjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MRQ4WpdkdCbQ8BuGG6a6f5d4fsv0G1ZJHBDXJ2fU2dg"
                  : character.image
              }
              alt=""
            />
            {display &&
              character.anime.map((anime, key) => (
                <Link key={key} to={`/anime-about/${anime.slug}`}>
                  <Typography variant="subtitle1" color="primary">
                    {anime.name}
                  </Typography>
                </Link>
              ))}
          </Grid>
          <Grid item xs={1} md={0} />
          <Grid item xs={12} md={7}>
            <Box>
              {display && character.other_names !== "" ? (
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  sx={{ mb: 1 }}
                >
                  <Typography variant="subtile1" color="primary">
                    Other Names:
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    {character.other_names}
                  </Typography>
                </Stack>
              ) : null}
              <Typography variant="subtile1" color="secondary">
                {character.about ? description() : "Not Available"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  );
}

export default Character;
