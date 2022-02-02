import React, { useState } from "react";
import { BrowserRouter, Route, Routes as DomRoutes } from "react-router-dom";
import Header from "./components/Header";

import Historic from "./pages/historic";
import Home from "./pages/home";

export default function Routes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <BrowserRouter>
      <Header handleOpen={handleOpen} />
      <DomRoutes>
        <Route
          path="/"
          element={<Home open={open} handleClose={handleClose} />}
          exact
        />
        <Route
          path="/historic"
          element={<Historic open={open} handleClose={handleClose} />}
        />
      </DomRoutes>
    </BrowserRouter>
  );
}
