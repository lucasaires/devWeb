import React from "react";
import { Menu, MenuItem, TextField } from "@mui/material";
import { useCardList } from "../../hooks/cardsList/useCardList";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Header({ handleOpen }) {
  const { changeListFilter } = useCardList();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewProblem = () => {
    setAnchorEl(null);
    handleOpen();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RESOLVE.CG
        </Typography>

        <TextField
          id="outlined-basic"
          label="Pesquisar"
          variant="outlined"
          onChange={(e) => changeListFilter(e.target.value)}
          sx={{ display: { xs: "none", md: "block" } }}
        />

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          ></IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/">
              <MenuItem onClick={handleClose}>Home</MenuItem>
            </Link>
            <MenuItem onClick={handleNewProblem}>Novo Problema</MenuItem>
            <Link to="/historic">
              <MenuItem onClick={handleClose}>Histórico</MenuItem>
            </Link>
          </Menu>
        </div>
      </Toolbar>
    </Box>
  );
}

export default Header;
