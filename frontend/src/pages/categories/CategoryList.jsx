import { useState, useEffect } from "react"
import { axiosRes } from "../../api/axiosDefaults"
import { ListGroup, Spinner } from "react-bootstrap"


const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axiosRes.get("/categories/")
                setCategories(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCategories()
    }, [])

    console.log(categories)

    return (
        <div className="category-list content">
            <h2>Categories</h2>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <ListGroup>
                    {categories?.map(category => (
                        <ListGroup.Item key={category.id}>
                            {category.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default CategoryList