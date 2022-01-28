import { Container, Row, Col } from 'react-bootstrap';
import DataContext from './DataContext';
import { useContext } from 'react';

const Stats = () => {
    const { summary } = useContext(DataContext);

    return (
        <Container className="p-3 border shadow-sm">
            <Row className="align-items-center">
                <Col><h5>Completed:</h5>
                    <p className="p-0 m-0">Runs: {summary.completedRuns}</p>
                    <p className="p-0 m-0">Distance: {summary.completedDistance.toFixed(1)} km</p></Col>
                <Col><h5>Planned:</h5>
                    <p className="p-0 m-0">Runs: {summary.unCompletedRuns}</p>
                    <p className="p-0 m-0">Distance: {summary.uncompletedDistance.toFixed(1)} km</p></Col>
            </Row>
        </Container>
    )
};

export default Stats;
