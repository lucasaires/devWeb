import React from "react";
import { BrowserRouter, Route, Routes as DomRoutes } from "react-router-dom";
import { Header } from "./components/Header";

import Historic from "./pages/historic";
import Home from "./pages/home";

export default function Routes() {
  return (
    <BrowserRouter>
      <DomRoutes>
        <Route path="/" element={<Home />} exact />
        <Route path="/historic" element={<Historic />} />
      </DomRoutes>
    </BrowserRouter>
  );
}
