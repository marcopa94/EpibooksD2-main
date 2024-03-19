import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: asin,
  });

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWRhMjRjNTllYzAwMTk5MGQ2ZmUiLCJpYXQiOjE3MTA3NzE0NjksImV4cCI6MTcxMTk4MTA2OX0.Eum5wjIMpLc2oISsKRoUvXwWj_U3MhsOwH-CW9BHea0",
        },
      });
      if (response.ok) {
        alert("Recensione inviata!");
        setComment({
          comment: "",
          rate: 1,
          elementId: asin,
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                ...comment,
                rate: e.target.value,
              })
            }
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate}>{rate}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
