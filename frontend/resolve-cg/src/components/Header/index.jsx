import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Content, ContainerB } from "./styles";

export function Header({ handleOpen, back }) {
  return (
    <>
      <ContainerB>
        <Content>
          <h1>Resolve.CG</h1>
          <nav>
            <a className="active" href="/">
              Home
            </a>

            {!back ? (
              <>
                {" "}
                <a className="active" onClick={handleOpen} href="#">
                  Novo Problema
                </a>
                <a className="active" href="/historic">
                  Histórico
                </a>
              </>
            ) : (
              <></>
            )}

            <TextField
              id="outlined-basic"
              label="Pesquisar"
              variant="outlined"
              fullWidth
            />
          </nav>
        </Content>
      </ContainerB>
    </>
  );
}
