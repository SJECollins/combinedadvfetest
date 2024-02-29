import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";


const NavBar = () => {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axiosReq.post("/dj-rest-auth/logout/")
            setCurrentUser(null)
            removeTokenTimestamp()
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const loggedInIcons = (
        <>
            <NavLink to="/add-todo" className="links">Add</NavLink>
            <NavLink to="/todo-list" className="links">All Todos</NavLink>
            <NavLink to="/my-list" className="links">My Todos</NavLink>
            <NavLink to="/" onClick={handleSignOut} className="links">Sign Out</NavLink>
        </>
    )

    const loggedOutIcons = (
        <>
            <NavLink to="/signin" className="links">Sign In</NavLink>
            <NavLink to="/signup" className="links">Sign Up</NavLink>
        </>
    )

    return (
        <Navbar fixed="top" expand="md" className="bg-body-tertiary">
            <Container className="d-flex justify-content-between">
                <NavLink to="/" className="links mr-1">
                    Home
                </NavLink>
                {currentUser && <p className="ml-1 mb-0">Hi, {currentUser.username}</p>}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex flex-lg-row justify-content-around align-items-center w-100">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;