import React from "react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import RecipeReviewCard from "../../components/Card";
import { useCardList } from "../../hooks/cardsList/useCardList";

import { EditProblem } from "../modal";

const Historic = ({ open, handleClose }) => {
  const { historic } = useCardList();

  return (
    <div>
      {<EditProblem open={open} handleClose={handleClose} />}
      <Container>
        <Box marginTop={5} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {historic &&
              historic.map((history) => (
                <Grid item xs={2} sm={4} md={4} key={history._id}>
                  {
                    <RecipeReviewCard
                      id={history._id}
                      title={history.title}
                      street={history.street}
                      adress={history.adress}
                      description={history.description}
                      likes={history.likes}
                      isResolved={history.isResolved}
                      coments={history.coments}
                    />
                  }
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Historic;
