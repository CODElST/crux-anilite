import React from "react";
import { Skeleton, Grid, Box } from "@mui/material";

function SkeletonLoading({ display }) {
  return (
    <div
      style={{ display: display ? "none" : "flex", flexDirection: "column" }}
    >
      {[...Array(15).keys()].map(() => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            justifyContent: "center",
            background: "#222222",
            zIndex: 10,
          }}
        >
          {[...Array(15).keys()].map((id) => (
            <Skeleton
              key={id}
              height={300}
              width={150}
              sx={{ bgcolor: "grey.500", margin: 1, flexShrink: 0 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function AnimeSkeletonLoading() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, alignItems: "center", justifyContent: "center" }}
    >
      <Grid item xs={12} sm={3} md={2}>
        <Skeleton
          height={450}
          width={200}
          sx={{
            bgcolor: "grey.500",
            ml: "auto",
            mr: "auto",
          }}
        />
      </Grid>
      <Grid item xs={0} md={1} />
      <Grid item xs={12} sm={9} md={6}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            background: "#222222",
            zIndex: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {[...Array(12).keys()].map((id) => (
            <Skeleton
              key={id}
              height={150}
              width={150}
              sx={{ bgcolor: "grey.500", margin: 1 }}
            />
          ))}
        </div>
      </Grid>
      <Grid item xs={0} md={1} />
      <Grid item xs={12} md={2} alignContent={"center"}>
        {[...Array(3).keys()].map((id) => (
          <Skeleton
            key={id}
            height={80}
            width={200}
            sx={{ bgcolor: "grey.500", ml: "auto", mr: "auto" }}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={12}>
        {" "}
        {[...Array(2).keys()].map(() => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              justifyContent: "center",
              background: "#222222",
              zIndex: 10,
            }}
          >
            {[...Array(20).keys()].map((id) => (
              <Skeleton
                key={id}
                height={300}
                width={150}
                sx={{ bgcolor: "grey.500", margin: 0.5, flexShrink: 0 }}
              />
            ))}
          </div>
        ))}
      </Grid>
    </Grid>
  );
}

function CharacterSkeletonLoading() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, mt: 6, alignItems: "center" }}
    >
      <Grid item xs={12}>
        <Skeleton
          width={300}
          height={100}
          sx={{
            bgcolor: "grey.500",
            ml: "auto",
            mr: "auto",
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Skeleton
          height={450}
          width={200}
          sx={{
            bgcolor: "grey.500",
            ml: "auto",
            mr: "auto",
          }}
        />
      </Grid>
      <Grid item xs={1} md={0} />
      <Grid item xs={12} md={7} sx={{ alignItems: "start" }}>
        <Skeleton
          variant="text"
          sx={{
            bgcolor: "grey.500",
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            bgcolor: "grey.500",
          }}
        />
        <Skeleton
          variant="text"
          width={100}
          sx={{
            bgcolor: "grey.500",
          }}
        />
      </Grid>
    </Grid>
  );
}

export { SkeletonLoading, AnimeSkeletonLoading, CharacterSkeletonLoading };
