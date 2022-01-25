import React from "react";
import { Skeleton } from "@mui/material";
function SkeletonLoading({ display }) {
  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: display ? "none" : "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "absolute",
        background: "#222222",
        zIndex: 10,
      }}
    >
      {/* <Skeleton
        height={600}
        width={"100%"}
        sx={{ bgcolor: "grey.500", margin: 2 }}
      /> */}
      {[...Array(50).keys()].map((id) => (
        <Skeleton
          key={id}
          height={400}
          width={200}
          sx={{ bgcolor: "grey.500", margin: 2 }}
        />
      ))}
    </div>
  );
}

export default SkeletonLoading;
