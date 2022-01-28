import { styled } from "@mui/material";

const CustomDiv = styled("div")(({ theme }) => ({
  background: theme.palette.primary.background,
  boxShadow: `2.17893px 2.17893px 6.5368px rgba(158, 121, 241, 0.6), 1px 1px 6.5368px ${theme.palette.primary.main}`,
  borderRadius: 20,
  padding: 10,
}));

const CustomGenreDiv = styled("div")(({ theme }) => ({
  [theme.breakpoints.down(1200)]: {
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
  },
  [theme.breakpoints.up(1400)]: {
    display: "none",
  },
  [theme.breakpoints.between(1201, 1400)]: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

export { CustomDiv, CustomGenreDiv };
