import React from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { Container } from "./style";
import { Col, Row } from "react-bootstrap";

export function EditProblem({ isOpen, onRequestClose, card }) {
  const { title, description, likes, coments } = card;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title,
      description,
      likes,
      coments,
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={() => onRequestClose(!isOpen)}>
        <Row>
          <Container>
            <h1>{title || "Título"}</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Col>
                <label>Título:</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input className="w-100" disabled {...field} />
                  )}
                  defaultValue={title}
                />
              </Col>

              <Col>
                <label>Descrição:</label>

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <input className="w-100" {...field} />}
                  defaultValue={description}
                />
              </Col>
              <Col>
                <label htmlFor="">Likes:</label>

                <Controller
                  name="likes"
                  control={control}
                  render={({ field }) => (
                    <input className="w-100" type="number" {...field} />
                  )}
                  defaultValue={likes}
                />
              </Col>

              <Col>
                <label htmlFor="">Comentário:</label>

                <Controller
                  name="coments"
                  control={control}
                  render={({ field }) => <input className="w-100" {...field} />}
                  defaultValue={coments}
                />
                <input type="submit" />
              </Col>
            </form>
          </Container>
        </Row>
      </Modal>
    </>
  );
}
