import React, { useState, useEffect } from "react";
import { Card, Button, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const TodoDetail = () => {
  const [todo, setTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser()
  const { id } = useParams()

  const is_owner = todo?.owner === currentUser?.username

  useEffect(() => {
    const handleMount = async () =>{
        try {
            const { data } = await axiosRes.get(`/todoitem/${id}/`)
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
        await axiosReq.delete(`/todoitem/${id}/`)
        setShowModal(false)
    } catch (err) {
        console.log(err)
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus == 2) {
      const today = new Date();
      const endDate = today.toISOString().split('T')[0]; 
      try {
        await axiosReq.patch(`/todoitem/${id}/`, {status: newStatus, finished_on: endDate})
        setTodo({...todo, status: newStatus, finished_on: endDate})
    } catch (err) {
        console.log(err)
    }      
    } else {
      try {
          await axiosReq.patch(`/todoitem/${id}/`, {status: newStatus, finished_on: null})
          setTodo({...todo, status: newStatus, finished_on: null})
      } catch (err) {
          console.log(err)
      }      
    }

  };

  if (!todo || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="content">
      <Card.Body>
        <TodoItem todo={todo} />
        {is_owner && (
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => setShowModal(true)}>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default TodoDetail;
