import { Row, Col } from 'react-bootstrap';
import DayCol from './DayCol';

const WeekRow = ({ week, currentWeek }) => {

    return (
        <Row className={week.weekNum === currentWeek ? "bg-white m-2 p-0 border shadow-sm" : "bg-light m-2 p-0 border shadow-sm"} key={week.weekNum}>
            <Col className="text-center align-self-center" key={week.weekNum}><h4>Wk {week.weekNum}</h4></Col>
            {week.dates.map(day => (
                <DayCol key={day.date} day={day} week={week} />
            ))
            }
        </Row>
    )
}

export default WeekRow
