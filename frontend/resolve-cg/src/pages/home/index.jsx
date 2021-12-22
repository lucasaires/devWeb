import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Header } from "../../components/Header";
import { EditProblem } from "../modal";
import { HiEmojiHappy, HiEmojiSad, HiExclamation } from "react-icons/hi";
import { Content } from "./styles";
import api from "../../services/api";

const mockApiCard = [
  {
    title: "Card Title",
    description: " lorem lorem lorem",
    isResolved: 1,
    likes: 5,
    coments: [],
  },
  {
    title: "Card Title",
    description: " lorem lorem lorem",
    isResolved: 2,
    likes: 2,
    coments: [],
  },
  {
    title: "Card Title",
    description: " lorem lorem lorem",
    isResolved: 3,
    likes: 0,
    coments: [],
  },

  {
    title: "Card Title",
    description: " lorem lorem lorem",
    isResolved: 2,
    likes: 2,
    coments: [],
  },
];

export function Home() {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState({});
  const [reclamations, setReclamations] = useState();
  const [cardSituation, setCardSituation] = useState();

  useEffect(() => {
    const handleReclamations = () => {
      const data = api.get("/reclamations");
      setReclamations(data);
    };

    handleReclamations();
  }, [reclamations]);

  const handleClick = (c) => {
    setCard(c);
    setShow(true);
  };

  const handleLikes = (c) => {
    setCard(c);
    setShow(true);
  };

  return (
    <>
      {card !== {} && (
        <EditProblem isOpen={show} onRequestClose={setShow} card={card} />
      )}
      <Header />
      <Container className="mt-5">
        <Content>
          <Row>
            {mockApiCard.map((card, index) => (
              <Col key={index} lg={4}>
                <Card
                  bg={
                    card.isResolved === 1
                      ? "danger"
                      : card.isResolved === 2
                      ? "warning"
                      : "success"
                  }
                  text={"white"}
                  style={{ width: "18rem" }}
                  className="mb-2 mt-5"
                >
                  <Card.Header>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      {card.title}{" "}
                      {card.isResolved === 1 ? (
                        <HiEmojiSad />
                      ) : card.isResolved === 2 ? (
                        <HiExclamation />
                      ) : (
                        <HiEmojiHappy />
                      )}{" "}
                    </Card.Title>
                    <Card.Text>{card.description}</Card.Text>

                    <Button
                      onClick={() => handleClick(card)}
                      variant="outline-light"
                    >
                      Saber mais
                    </Button>

                    <Button
                      onClick={() => handleLikes(card)}
                      variant="outline-light"
                      className="button-like"
                    >
                      Likes
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </>
  );
}
