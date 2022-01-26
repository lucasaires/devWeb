import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Input, TextField } from "@mui/material";
import api from "../../services/api";

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
  isResolved,
  coments,
}) {
  const [expanded, setExpanded] = useState(false);
  const [newComentsState, setNewComentsState] = useState(false);

  const [newLikes, setNewLikes] = useState(likes);
  const [newComent, setNewComent] = useState();
  const [newComentArray, setNewComentArray] = useState(coments);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const setLikes = async () => {
    const response = await api.put(`editLike/${id}`);
    const newlikes = response.data.likes;
    setNewLikes(newlikes);
  };

  const handleSubmitComents = async () => {
    const response = await api.post(`/newComent/${id}`, { coments: newComent });
    console.log(response);

    const data = response.data;
    setNewComentArray(data.coments);
    setNewComentsState(false);
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={setLikes}>
          {newLikes}
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
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
              {/* <Input
                onChange={(e) => setNewComent(e.target.value)}
                type="text"
              /> */}
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
