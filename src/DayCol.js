import { Col, Container } from 'react-bootstrap';
import TrainingData from './TrainingData';
import AddTraining from './AddTraining';
import './DayCol.css';
import { useState, useEffect, useContext } from 'react';
import DataContext from './DataContext';

const DayCol = ({ day, week }) => {
    const date = new Date(day.date);
    const dayName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [run, setRun] = useState(JSON.parse(localStorage.getItem(`run${Date.parse(new Date(day.date))}`)) || "");
    const { updateSummary } = useContext(DataContext);

    useEffect(() => {
        if (run) {
            localStorage.setItem(`run${Date.parse(new Date (day.date))}`, JSON.stringify(run));
            updateSummary();
        }
    }, [run, day])

    return (
        <Col className={run.completed ? "completedDayColumn" : null} key={date}>
            <Container className="p-2 m-0">
                <h5>{dayName[date.getDay()]} {date.getDate()} {monthName[date.getMonth()]}</h5>
                {run ?
                    <TrainingData run={run} setRun={setRun} completed={run.completed} date={date} week={week} />
                    : <AddTraining date={date} week={week} setRun={setRun} />}
            </Container>
        </Col>
    )
}

export default DayCol
