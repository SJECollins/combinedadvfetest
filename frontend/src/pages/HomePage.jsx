import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function HomePage() {
    const currentUser = useCurrentUser();
    console.log(currentUser)

    return (
        <Container>
            <h1>Welcome to Our Todo App!</h1>
            <p>
                This is a simple Todo App. Please sign up or sign in to start managing your todos.
            </p>
            {!currentUser ? (
                <div>
                    <Button variant="primary" href="/signup">Sign Up</Button>{' '}
                    <Button variant="secondary" href="/signin">Sign In</Button>
                </div>
            ) : (
                <Button variant="primary" href="/todos">View Your Todos</Button>
            )}
        </Container>
    );
}

export default HomePage;
