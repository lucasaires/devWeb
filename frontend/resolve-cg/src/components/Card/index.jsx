import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Check from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import api from "../../services/api";
import { useCardList } from "../../hooks/cardsList/useCardList";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  id,
  title,
  description,
  likes,
  adress,
  street,
  isResolved,
  coments,
}) {
  const [expanded, setExpanded] = useState(false);
  const [newComentsState, setNewComentsState] = useState(false);

  const [newLikes, setNewLikes] = useState(likes);
  const [newComent, setNewComent] = useState();
  const [newComentArray, setNewComentArray] = useState(coments);

  const { handleList } = useCardList();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const setLikes = async () => {
    await api.put(`editLike/${id}`);
    // const newlikes = response.data.likes;
    handleList();
    setNewLikes(newLikes + 1);
  };

  const handleSubmitComents = async () => {
    const response = await api.post(`/newComent/${id}`, { coments: newComent });

    const data = response.data;
    setNewComentArray(data.coments);
    setNewComentsState(false);
  };

  const deleteCard = async () => {
    let hash = prompt("Digite o código de confirmação:");

    await api.delete(`/deleteProblem/${id}/${hash}`);
    handleList();
  };

  const handleChangeResolve = async () => {
    let hash = prompt("Digite o código de confirmação:");

    await api.put(`/changeResolved/${id}/${hash}`);
    handleList();
  };
  return (
    <Card sx={{ maxWidth: 315 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="delete" onClick={deleteCard}>
            <DeleteIcon />
          </IconButton>
        }
        title={title}
        subheader={`${adress}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Rua:</strong> {street}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <strong> Descrição: </strong> {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={setLikes}>
          {newLikes}
          <FavoriteIcon style={{ color: "red", marginLeft: "2px" }} />
        </IconButton>
        <IconButton aria-label="check" onClick={handleChangeResolve}>
          <Check style={{ color: "green" }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comentários:</Typography>

          {newComentArray.map((coment) => (
            <Box marginBottom={2}>
              <Typography variant="span">{coment}</Typography>
            </Box>
          ))}

          {newComentsState && (
            <Box marginBottom={2}>
              <TextField
                mt={2}
                id="outlined-multiline-static"
                label="Digite seu comentário aqui"
                multiline
                rows={1}
                onChange={(e) => setNewComent(e.target.value)}
              />

              <Button onClick={handleSubmitComents}> enviar</Button>
            </Box>
          )}
          <Box>
            <button onClick={() => setNewComentsState(true)}>
              adicionar comentário
            </button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
