import { FaArrowsAltH } from 'react-icons/fa';
import { BiTimeFive, BiRun, BiEdit, BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import AddForm from './AddForm';
import './TrainingData.css';
import { useContext } from 'react';
import DataContext from './DataContext';

const TrainingData = ({ run, setRun, completed, date, week }) => {

    const {updateSummary} = useContext(DataContext);
    const initValues = {
        distance: run.distance,
        duration: run.duration,
        speed: run.speed
    }
    
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">
                <span>Update training</span>
            </Popover.Header>
            <Popover.Body>
                <AddForm date={date} week={week} setRun={setRun} initValues={initValues} />
            </Popover.Body>
        </Popover>
    )

    const toggleComplete = () => {
        setRun({...run, completed: !run.completed});
        updateSummary();
    }

    const deleteRun = () => {
        setRun("")
        localStorage.removeItem(`run${Date.parse(new Date(date))}`)
        updateSummary();
    }

    const expandSpeed = (v) => {
        let min = Math.floor(v) ? Math.floor(v) : "";
        let sec = Math.round((v % 1) * 60) ? Math.round((v % 1) * 60) : "";
        if (min === "" && sec) {
            min = 0;
        } else if (sec === "" && min) {
            sec = 0;
        }
        return [min, sec];
    }

    return (
        <div>
            <p className="p-0 m-0"><FaArrowsAltH /> {run.distance} km</p>
            <p className="p-0 m-0"><BiTimeFive /> {run.duration} min</p>
            <p className="p-0 m-0"><BiRun /> {('0'+expandSpeed(run.speed)[0]).slice(-2)}:{('0'+expandSpeed(run.speed)[1]).slice(-2)} min/km</p>
            <BiCheckCircle className={completed ? "completedIcon" : "checkIcon"} onClick={toggleComplete} />
            <BiXCircle className="deleteIcon" onClick={deleteRun} />
            <OverlayTrigger trigger="click" placement="right" rootClose overlay={popover}>
                <div style={{display: "inline"}}>
                    <BiEdit className="updateIcon" />
                </div>
            </OverlayTrigger>
        </div>
    )
}

export default TrainingData
