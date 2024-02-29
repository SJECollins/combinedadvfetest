import React from "react";
import { Card } from "react-bootstrap";

const TodoItem = ({ todo }) => {
  const { category, name, category_name, description, status, owner, created_on, finished_on } = todo;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <hr/>
        <Card.Text>
          <strong>Description:</strong> {description}
        </Card.Text>
        <Card.Text>
          <strong>Owner:</strong> {owner}
        </Card.Text>
        <Card.Text>
          <strong>Category:</strong> {category_name}
        </Card.Text>
        <Card.Text>
          <strong>Created On:</strong> {created_on}
        </Card.Text>
        {finished_on &&
        <Card.Text>
          <strong>Finished On:</strong> {finished_on}
        </Card.Text>
        }
        <Card.Text>
          <strong>Status:</strong> {status === 0 ? "Pending" : status === 1 ? "In Progress" : "Done"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
