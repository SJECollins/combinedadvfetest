import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function HomePage() {
    const currentUser = useCurrentUser();

    return (
        <Container className='content'>
            {!currentUser ? (
                <div>
                    <h1>Welcome!</h1>
                    <p>
                        This is a simple Todo App. Please sign up or sign in to start managing your todos.
                    </p>
                    <NavLink className="btns" to="/signup">Sign Up</NavLink>{' '}
                    <NavLink className="btns" to="/signin">Sign In</NavLink>
                </div>
            ) : (
                <div>
                    <h1>Welcome back!</h1>
                    <p>
                        Manage your todo items:
                    </p>
                    <NavLink className="btns" to="/my-list">View Your Todos</NavLink>
                </div>
            )}
        </Container>
    );
}

export default HomePage;
