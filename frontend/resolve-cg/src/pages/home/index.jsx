import React, { useEffect, useState } from "react";
import { EditProblem } from "../modal";
import RecipeReviewCard from "../../components/Card";
import api from "../../services/api";
import { Container, Grid, Box } from "@mui/material";
import { useCardList } from "../../hooks/cardsList/useCardList";

export default function Home({ open, handleClose }) {
  const { list, changeList, valuelist } = useCardList();

  useEffect(() => {
    async function handleReclamations() {
      const response = await api.get(`/problems/?historic=false`);

      const data = response.data;

      changeList(data);
    }

    handleReclamations();
  }, [open, changeList]);

  const filterCard = list?.filter((l) =>
    l.title.toLowerCase().includes(valuelist.toLowerCase())
  );

  return (
    <>
      {<EditProblem open={open} handleClose={handleClose} />}

      <Container>
        <Box marginTop={5} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filterCard !== undefined &&
              filterCard.map((problem) => (
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
