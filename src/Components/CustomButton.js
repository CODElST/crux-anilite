import { Button, IconButton, styled } from "@mui/material";

const CustomContainedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.button.background,
  color: theme.palette.primary.button.color,
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 12,
  paddingLeft: 12,
  borderRadius: 3,
  "&:hover": {
    backgroundColor: theme.palette.primary.button.hover,
  },
}));

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.button.color,
  paddingTop: 3,
  paddingBottom: 3,
  paddingRight: 11,
  paddingLeft: 11,
  borderRadius: 3,
  border: `1px solid ${theme.palette.primary.button.background}`,
  "&:hover": {
    backgroundColor: theme.palette.primary.button.hover,
  },
}));

const CustomTextButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.button.color,
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 12,
  paddingLeft: 12,
  borderRadius: 3,
  "&:hover": {
    backgroundColor: theme.palette.primary.button.hover,
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.button.color,
  "&:hover": {
    backgroundColor: theme.palette.primary.button.hover,
  },
  [theme.breakpoints.down("md")]: {
    height: 36,
    width: 36,
    backgroundColor: "transparent",
  },
}));

const CustomGenreButton = styled(Button)(({ theme }) => ({
  margin: 2,
  borderRadius: 20,
  opacity: 0.75,
  flexShrink: 0,
  "&:hover": {
    opacity: 1,
  },
  [theme.breakpoints.down("md")]: {
    height: 30,
    fontSize: "0.75rem",
  },
}));

export {
  CustomContainedButton,
  CustomOutlinedButton,
  CustomTextButton,
  CustomIconButton,
  CustomGenreButton,
};
