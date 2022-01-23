import darkTheme from "./MuiTheme";

darkTheme.typography.h1 = {
  fontFamily: ["Quicksand"],
  fontWeight: 700,
  fontSize: "4rem",
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "2rem",
    fontWeight: 600,
  },
};

darkTheme.typography.h2 = {
  fontFamily: ["Quicksand"],
  fontSize: "3rem",
  fontWeight: 600,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
    fontWeight: 500,
  },
};

darkTheme.typography.h3 = {
  fontFamily: ["Quicksand"],
  fontSize: "2rem",
  fontWeight: 500,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
  },
};

darkTheme.typography.h4 = {
  fontFamily: ["Quicksand"],
  fontSize: "1.4rem",
  fontWeight: 500,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
  },
};

darkTheme.typography.body1 = {
  fontFamily: ["Quicksand"],
  fontSize: "1.3rem",
  fontWeight: 500,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
};

darkTheme.typography.body2 = {
  fontFamily: ["Quicksand"],
  fontSize: "1.2rem",
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
};

darkTheme.typography.subtitle1 = {
  fontFamily: ["Quicksand"],
  fontSize: "1.2rem",
  fontWeight: 400,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
};

darkTheme.typography.subtitle2 = {
  fontFamily: ["Quicksand"],
  fontSize: "0.75rem",
  fontWeight: 300,
  lineHeight: 1,
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
};

export default darkTheme;
