import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { EditProblem } from "../modal";
import RecipeReviewCard from "../../components/Card";
import api from "../../services/api";
import { Container, Grid, Box, TextField } from "@mui/material";

export default function Home() {
  const [reclamations, setReclamations] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function handleReclamations() {
      if (!reclamations) {
        const response = await api.get(`/problems/?historic=false`);

        const data = response.data;
        setReclamations(data);
      }
    }

    handleReclamations();
  }, [reclamations]);

  useEffect(() => {
    async function handleReclamations() {
      const response = await api.get(`/problems/?historic=false`);

      const data = response.data;

      setReclamations(data);
    }

    handleReclamations();
  }, [open]);

  return (
    <>
      {
        <EditProblem
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      }
      <Header handleOpen={handleOpen} />
      <Container>
        <Box marginTop={5} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {reclamations !== undefined &&
              reclamations.map((problem) => (
                <Grid item xs={12} sm={3} md={4} key={problem._id}>
                  {
                    <RecipeReviewCard
                      id={problem._id}
                      title={problem.title}
                      description={problem.description}
                      likes={problem.likes}
                      isResolved={problem.isResolved}
                      coments={problem.coments}
                    />
                  }
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
