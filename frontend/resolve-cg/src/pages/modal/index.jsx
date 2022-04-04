import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useCardList } from "../../hooks/cardsList/useCardList";
import api from "../../services/api";

const style = {
  position: "absolute",
  marginTop: "2%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function EditProblem({ open, handleClose }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {},
  });

  const { addCard } = useCardList();

  const onSubmit = async (data) => {
    const problem = await api.post("/newProblem", {
      ...data,
      isResolved: false,
    });

    if (problem.status === 200) {
      reset();

      handleClose();
      const hash = problem.data.hash;
      handleAlert(hash);
      addCard(problem.data);
    } else {
      handleClose();
      alert("Erro ao cadastrar problema");
    }
  };

  const handleAlert = (problem) => {
    alert(`Anote o Código: ${problem}`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll" }}
    >
      <Box sx={style}>
        <Typography textAlign={"center"} variant="h4">
          Cadastre um novo problema:
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography marginBottom={1} marginTop={5}>
                {" "}
                <strong>DESCRIÇÃO: </strong>{" "}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField label="Título" fullWidth required {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField label="Descrição" fullWidth required {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography marginTop={2} marginBottom={1}>
                {" "}
                <strong> LOCALIZAÇÃO: </strong>
              </Typography>
            </Grid>

            <Grid item lg={6} xs={12}>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="CEP" {...field} />
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Controller
                name="adress"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label="Bairro" required {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField label="Rua" fullWidth required {...field} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box>
                <input
                  type="submit"
                  style={{
                    width: "100%",
                    height: "40px",
                    color: "white",
                    background: "#1565c0",
                    minWidth: "64px",
                    textTransform: "uppercase",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
