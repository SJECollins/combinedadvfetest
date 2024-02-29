import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { axiosRes } from "../../api/axiosDefaults";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const TodoList = () => {
  const [owners, setOwners] = useState([])
  const [categories, setCategories] = useState([])
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filters, setFilters] = useState({
    owner: "",
    category: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("created_on");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const [{ data: todos }, { data: categories}] = await Promise.all([
          axiosRes.get("/todoitems/"),
          axiosRes.get("/categories/")
        ]) 
        setOwners(createOwners(todos))
        setTodos(todos);
        setCategories(categories)
        setFilteredTodos(todos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  console.log(todos)
  console.log(filteredTodos)

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      return (
        todo.owner.includes(filters.owner) &&
        (filters.status === "" || todo.status == filters.status) &&
        (filters.category === "" || todo.category == filters.category) &&
        (todo.name.includes(searchTerm) ||
          todo.category.includes(searchTerm) ||
          todo.owner.includes(searchTerm))
      );
    });
    setFilteredTodos(filtered);
  }, [todos, filters, searchTerm]);

  const createOwners = (todos) => {
    let ownerList = []
    for (let todo of todos) {
      if (!ownerList.includes(todo.owner)) ownerList.push(todo.owner)
    }
    return ownerList
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      owner: "",
      category: "",
      status: "",
    });
    setSearchTerm("");
    setOrderBy("created_on");
    setFilteredTodos(todos);
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <Form>
        <Row>
          <Form.Group as={Col} controlId="formGridOwner">
            <Form.Control
              as="select"
              placeholder="Owner"
              value={filters.owner}
              onChange={handleFilterChange}
            >
              <option value="">Owner</option>
              {owners.map((own, index) => (
                <option key={index} value={own}>{own}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Control
              as="select"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
              </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Control
              as="select"
              placeholder="Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Status</option>
              <option value="0">Pending</option>
              <option value="1">In Progress</option>
              <option value="2">Done</option>
              </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridSearch">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridOrderBy">
            <Form.Control
              as="select"
              value={orderBy}
              onChange={handleOrderByChange}
            >
              <option value="created_on">Created On</option>
              <option value="finished_on">Finished On</option>
              <option value="status">Status</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Form>

      <Row>
        {filteredTodos.map((todo) => (
          <Col key={todo.id} sm={6} md={4} lg={3}>
            <TodoItem todo={todo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TodoList;
