import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export function Preview() {
  const [problem, setProblem] = useState();

  const { id } = useParams();

  useEffect(() => {
    async function handleProblem() {
      const response = await api.get(`/problem/${id}`);

      const data = response.data;

      setProblem(data);
    }

    if (!problem) {
      handleProblem();
    }
  }, [id, problem]);

  return (
    <Container>
      <Box
        marginTop={5}
        sx={{ flexGrow: 1, border: "1px solid #ccc", padding: 2 }}
      >
        <Typography variant="h4">Título: {problem?.title} </Typography>
        <Typography variant="h4">Descrição: {problem?.description} </Typography>
        <Typography variant="h4">Rua: {problem?.street}</Typography>
        <Typography variant="h4">Endereço: {problem?.adress}</Typography>
        <Typography variant="h4">Cep: {problem?.cep}</Typography>
        <Typography variant="h4">
          Comentários:
          {problem?.coments.map((coment) => (
            <li style={{ listStyle: "none", marginLeft: 30 }}>{coment}</li>
          ))}
        </Typography>
      </Box>
    </Container>
  );
}
