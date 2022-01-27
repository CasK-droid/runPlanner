import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigate = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container className="fluid">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Add run</Nav.Link>
                        <Nav.Link href="#pricing">About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigate
