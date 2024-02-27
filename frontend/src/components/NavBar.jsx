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
            <NavLink to="/add-item">Add Item</NavLink>
            <NavLink to="/items">My Items</NavLink>
            <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
        </>
    )

    const loggedOutIcons = (
        <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </>
    )

    return (
        <Navbar fixed="top">
            <Container>
                <NavLink to="/">
                    Home
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;