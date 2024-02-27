import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function HomePage() {
    const currentUser = useCurrentUser();
    console.log(currentUser)

    return (
        <Container className='content'>
            {!currentUser ? (
                <div>
                    <h1>Welcome!</h1>
                    <p>
                        This is a simple Todo App. Please sign up or sign in to start managing your todos.
                    </p>
                    <Button variant="primary" href="/signup">Sign Up</Button>{' '}
                    <Button variant="secondary" href="/signin">Sign In</Button>
                </div>
            ) : (
                <div>
                    <h1>Welcome back!</h1>
                    <p>
                        Manage your todo items:
                    </p>
                    <Button variant="primary" href="/todos">View Your Todos</Button>
                </div>
            )}
        </Container>
    );
}

export default HomePage;
