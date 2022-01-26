import {
  Box,
  Button,
  Grid,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function EditProblem({ open, handleOpen, handleClose }) {
  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    await api.post("newProblem", { ...data, isResolved: false });
    // window.location.reload(false);
    reset();
    handleClose();
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
            <Grid xs={12}>
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

            <Grid xs={12}>
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
