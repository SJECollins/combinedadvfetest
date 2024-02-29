import React, { useState, useEffect } from "react";
import { Card, Button, DropdownButton, Dropdown } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const TodoDetail = () => {
  const [todo, setTodo] = useState(null);
  const currentUser = useCurrentUser()
  const { id } = useParams()

  const is_owner = todo?.owner === currentUser?.username

  useEffect(() => {
    const handleMount = async () =>{
        try {
            const { data } = await axiosRes.get(`/todos/${id}/`)
            setTodo(data) 
        } catch (err) {
            console.log(err)
        }
    }
    handleMount()
  }, [id]);

  const handleEdit = () => {
  };

  const handleDelete = async () => {
    e.preventDefault()
    try {
        await axiosReq.delete(`/todos/${id}`)
    } catch (err) {
        console.log(err)
    }
  };

  const handleStatusChange = async (newStatus) => {
    e.preventDefault()
    try {
        await axiosReq.put(`/todos/${id}`, {status: newStatus})
        setTodo({...todo, status: newStatus})
    } catch (err) {
        console.log(err)
    }
  };

  if (!todo || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <TodoItem todo={todo} />
        {is_owner && (
          <div>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>{" "}
            <DropdownButton id="dropdown-basic-button" title="Change Status">
              <Dropdown.Item
                onClick={() => handleStatusChange(0)}
                disabled={status === 0}
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleStatusChange(1)}
                disabled={status === 1}
              >
                In Progress
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleStatusChange(2)}
                disabled={status === 2}
              >
                Done
              </Dropdown.Item>
            </DropdownButton>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoDetail;
