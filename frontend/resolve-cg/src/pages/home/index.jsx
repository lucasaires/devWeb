import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Header } from "../../components/Header";
import { EditProblem } from "../modal";
import { Content } from "./styles";

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
];

export function Home() {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState({});

  const handleClick = (c) => {
    setCard(c);
    setShow(true);
  };

  useEffect(() => {}, [card]);

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
              <Col key={index} lg={3}>
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
                  className="mb-2"
                >
                  <Card.Header>{card.title}</Card.Header>
                  <Card.Body>
                    <Card.Title> {card.title} </Card.Title>
                    <Card.Text>{card.description}</Card.Text>

                    <Button
                      onClick={() => handleClick(card)}
                      variant="outline-light"
                    >
                      Saber mais
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
