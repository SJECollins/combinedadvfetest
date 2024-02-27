import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosReq } from "../../api/axiosDefaults"
import { Button, Col, Form, Row } from "react-bootstrap"


const CreateCategoryForm = () => {
    const [errors, setErrors] = useState({})

    const [categoryData, setCategoryData] = useState({
        name: ""
    })
    const { name } = categoryData

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axiosReq.post("/categories/", {"name": name})
            navigate("/")
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="content">
            <Row>
                <Col>
                    <h2>Add a category:</h2>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={handleChange}/>
                    </Form.Group>
                    {errors?.name?.map((message, index) => {
                        <div key={index}>
                            {message}
                        </div>
                    })}
                    <Button className="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button className="primary" type="submit">Add</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default CreateCategoryForm
