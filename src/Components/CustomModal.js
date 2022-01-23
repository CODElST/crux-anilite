import * as React from "react";
import {
  CustomIconButton,
  CustomTextButton,
  CustomOutlinedButton,
  CustomGenreButton,
  CustomContainedButton,
} from "./CustomButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Backdrop, Modal, Fade, Typography } from "@mui/material";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import colorGenerator from "../Functions/ColorGenerator";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

const style = {
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    height: window.innerHeight,
    width: "100%",
  },
  buttonGroup: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

function CustomMenuModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CustomIconButton aria-label="menu" onClick={handleOpen}>
        <MenuIcon />
      </CustomIconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
        sx={style.modal}
      >
        <Fade in={open}>
          <Stack direction={"column"} spacing={1} sx={style.buttonGroup}>
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="/"
            >
              <CustomTextButton> Home </CustomTextButton>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="all-anime"
            >
              <CustomTextButton> All Anime </CustomTextButton>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="top-anime"
            >
              <CustomTextButton> Top Anime </CustomTextButton>
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  background: isActive ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="about-us"
            >
              <CustomTextButton> About Us </CustomTextButton>
            </NavLink>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}

function CustomFilterModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const parameter = searchParams.get("sort");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CustomOutlinedButton aria-label="menu" onClick={handleOpen}>
        <FilterAltIcon />
        Filter
      </CustomOutlinedButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
        sx={style.modal}
      >
        <Fade in={open}>
          <Stack direction={"column"} spacing={1} sx={style.buttonGroup}>
            <NavLink
              style={() => {
                return {
                  background: parameter === "all" ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="?sort=all"
            >
              <CustomTextButton> All </CustomTextButton>
            </NavLink>
            <NavLink
              style={() => {
                return {
                  background: parameter === "ongoing" ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="?sort=ongoing"
            >
              <CustomTextButton> Ongoing </CustomTextButton>
            </NavLink>
            <NavLink
              style={() => {
                return {
                  background: parameter === "completed" ? "#6C48C0" : "",
                  borderRadius: 3,
                  textAlign: "center",
                  alignSelf: "center",
                };
              }}
              to="?sort=completed"
            >
              <CustomTextButton> Completed </CustomTextButton>
            </NavLink>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}

function CustomGenreModal({ genres }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const parameter = searchParams.get("genre");
  console.log(parameter);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CustomOutlinedButton aria-label="menu" onClick={handleOpen}>
        <AddIcon />
        Genre
      </CustomOutlinedButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
        sx={style.modal}
      >
        <Fade in={open}>
          <div
            style={{
              padding: 16,
              textAlign: "center",
              overflowY: "scroll",
              // display: "flex",
              flex: 1,
              height: window.innerHeight,
            }}
          >
            <div style={{ padding: 8 }}>
              <CustomContainedButton>Apply</CustomContainedButton>
            </div>
            {genres.map((item, id) => {
              let color = colorGenerator();
              return (
                <CustomGenreButton
                  key={id}
                  variant="outlined"
                  style={{
                    color: color,
                    borderColor: color,
                    margin: 2,
                    // background:
                    //   genre === null
                    //     ? "transparent"
                    //     : genre.includes(item.name)
                    //     ? color
                    //     : "transparent",
                  }}
                  // onClick={(event) => handleClick(item.name, event)}
                >
                  {item.name}
                </CustomGenreButton>
              );
            })}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export { CustomMenuModal, CustomFilterModal, CustomGenreModal };
