import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { CustomTextButton } from "../Components/CustomButton";

function UserDash() {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ padding: 2, minHeight: window.innerHeight - 300 }}
      >
        <Grid item xs={3}>
          <div
            style={{
              height: window.innerHeight,
              overflow: "scroll",
            }}
          >
            <div
              style={{
                marginTop: 64,
                paddingLeft: "20%",
                paddingRight: "20%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CustomTextButton
                sx={{
                  borderRadius: 20,
                  fontSize: 20,
                  textAlign: "left",
                  "&:hover": {
                    background: "transparent",
                    border: "1px solid transparent",
                    borderColor: "primary.main",
                  },
                }}
              >
                Info
              </CustomTextButton>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            textAlign: "center",
          }}
        >
          <img
            alt=""
            src="https://wallpapercave.com/wp/wp4720359.jpg"
            id="userCoverImageMask"
            style={{
              width: "100%",
              maskImage: "linear-gradient(to right, black, transparent)",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default UserDash;
