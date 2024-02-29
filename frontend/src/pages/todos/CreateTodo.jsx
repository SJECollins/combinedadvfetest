import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const CreateTodoForm = () => {
  const [categories, setCategories] = useState([]);
  const [todoData, setTodoData] = useState({
    category: "",
    name: "",
    description: "",
    status: "0",
  });

  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosRes.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let categoryToAddId;
      if (todoData.category === "new") {
        const { data: newCategoryData } = await axiosReq.post("/categories/", {
          name: newCategory,
        });
        categoryToAddId = newCategoryData.id;
      } else {
        categoryToAddId = todoData.category;
      }
      const { data } = await axiosReq.post("/todoitems/", {
        ...todoData,
        category: categoryToAddId,
      });

      navigate(-1);
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  const handleSubmitCat = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosReq.post("/categories/", { name: newCategory})
      setCategories([...categories, data])
      navigate(-1)
    } catch (err) {
      console.log(err)
      setError(err.response?.data)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" && value !== "new") {
      setNewCategory("");
    }
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <Container className="content">
    <Form onSubmit={handleSubmit}>
      <h1>Create Todo</h1>
      {error.non_field_errors?.map((message, index) => (
        <Alert key={index} variant="danger">{message}</Alert>
      ))}
      <Form.Group controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={todoData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          <option value="new">Add New Category</option>
        </Form.Control>
        {todoData.category === "new" && (
          <Form.Control
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
        )}
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={todoData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={todoData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group controlId="formBasicStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={todoData.status}
          onChange={handleChange}
        >
          <option value="0">Pending</option>
          <option value="1">In Progress</option>
          <option value="2">Done</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    <Form onSubmit={handleSubmitCat}>
    <h1>New Category</h1>
    <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="newCategory"
          value={newCategory}
          onChange={handleNewCategoryChange}
          placeholder="Enter name"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  );
};

export default CreateTodoForm;
