import { Container, Row, Col } from 'react-bootstrap';
import DataContext from './DataContext';
import { useContext } from 'react';
import Stats from './Stats';

const Header = () => {
    const { summary } = useContext(DataContext);

    return (
        <Container fluid className="p-2 border-bottom text-center">
            <Row className="align-items-center">
                <Col><h1 className="text-dark p-2">Run planner</h1></Col>
                <Col className="text-start">{Object.keys(summary).length !== 0 ? <Stats /> : null}</Col>
            </Row>
        </Container>
    )
}

export default Header
