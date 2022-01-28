import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import AddForm from './AddForm';
import './AddTraining.css';
import {FaPlus} from 'react-icons/fa'

const AddTraining = ({ date, week, setRun }) => {
    const initValues={
        distance: "",
        duration: "",
        speed: ""
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">
                <span>Add training</span>
            </Popover.Header>
            <Popover.Body>
                <AddForm date={date} week={week} setRun={setRun} initValues={initValues} />
            </Popover.Body>
        </Popover>
    )

    return (
        <div>
            <OverlayTrigger trigger="click" placement="right" rootClose overlay={popover}>
                <Button id="addTraining" variant="outline-primary"><FaPlus /></Button>
            </OverlayTrigger>
        </div>
    )
}

export default AddTraining
