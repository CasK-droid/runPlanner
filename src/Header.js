import { Container, Row, Col } from 'react-bootstrap';
import DataContext from './DataContext';
import { useContext } from 'react';
import Stats from './Stats';
import {FaForward} from 'react-icons/fa';

const Header = () => {
    const { summary } = useContext(DataContext);

    return (
        <Container fluid className="px-4 py-2 text-center">
            <Row className="align-items-center">
                <Col><h1 className="text-dark p-2"><i><FaForward /></i> Run planner <i><FaForward /></i></h1></Col>
                <Col className="text-start">{Object.keys(summary).length !== 0 ? <Stats /> : null}</Col>
            </Row>
        </Container>
    )
}

export default Header
