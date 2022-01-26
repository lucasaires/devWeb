import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RecipeReviewCard from "../../components/Card";
import api from "../../services/api";

import { Header } from "../../components/Header";

const Historic = () => {
  const [dataHistory, setDataHistory] = useState();

  useEffect(() => {
    const handleHistoric = async () => {
      const response = await api.get("/problems/?historic=true");

      const data = response.data;

      setDataHistory(data);
    };

    handleHistoric();
  }, []);

  return (
    <div>
      <Header back />

      <Container>
        <Box marginTop={5} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {dataHistory &&
              dataHistory.map((history) => (
                <Grid item xs={2} sm={4} md={4} key={history._id}>
                  {
                    <RecipeReviewCard
                      id={history._id}
                      title={history.title}
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
