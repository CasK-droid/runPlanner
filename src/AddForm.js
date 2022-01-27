import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import DataContext from './DataContext';

const AddForm = ({ setRun, initValues }) => {
    const { updateSummary } = useContext(DataContext);

    const [editDistance, setEditDistance] = useState('');
    const [editDuration, setEditDuration] = useState('');
    const [editSpeed, setEditSpeed] = useState('');
    const [editMinute, setEditMinute] = useState('');
    const [editSecond, setEditSecond] = useState('');
    const [errors, setErrors] = useState('');

    const [distanceReadOnly, setDistanceReadOnly] = useState(false);
    const [durationReadOnly, setDurationReadOnly] = useState(false);
    const [speedReadOnly, setSpeedReadOnly] = useState(false);

    const [calcField, setCalcField] = useState('');

    useEffect(() => {
        setEditDistance(initValues.distance);
        setEditDuration(initValues.duration);
        setEditSpeed(initValues.speed);

        if (initValues.distance && initValues.duration && initValues.speed) {
            setSpeedReadOnly(true);
            setCalcField("speed");
        }
    }, [])

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

    const reduceSpeed = (min, sec) => {
        const minutes = min ? min : 0;
        const seconds = sec ? sec : 0;
        return minutes + seconds / 60;
    }

    const addRun = () => {
        const checkErrors = findFormErrors();

        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors);
        } else {

            const run = {
                distance: editDistance,
                duration: editDuration,
                speed: editSpeed,
                completed: false
            };

            setRun(run);
            document.body.click()
            setTimeout(function() {
                updateSummary()
              }, 200);
        }
    }

    const calculateField = (l, t, v) => {
        if (calcField === "speed" || calcField === "") {
            if (l && t) {
                const calcSpeed = t / l;
                initValues.speed = calcSpeed;
                setSpeedReadOnly(true);
                setEditSpeed(calcSpeed);
                setCalcField("speed");
            } else if (calcField === "speed") {
                initValues.speed = "";
                setSpeedReadOnly(false);
                setEditSpeed("");
                setCalcField("");
            }
        }
        if (calcField === "distance" || calcField === "") {
            if (t && v) {
                const calcDistance = t / v;
                initValues.distance = calcDistance.toFixed(1);
                setDistanceReadOnly(true);
                setEditDistance(calcDistance.toFixed(1));
                setCalcField("distance");
            } else if (calcField === "distance") {
                initValues.distance = "";
                setDistanceReadOnly(false);
                setEditDistance("");
                setCalcField("");
            }
        }
        if (calcField === "duration" || calcField === "") {
            if (l && v) {
                const calcDuration = l * v;
                initValues.duration = calcDuration.toFixed(0);
                setDurationReadOnly(true);
                setEditDuration(calcDuration.toFixed(0));
                setCalcField("duration");
            } else if (calcField === "duration") {
                initValues.duration = "";
                setDurationReadOnly(false);
                setEditDuration("");
                setCalcField("");
            }
        }
    }

    const updateDistance = (distance) => {
        initValues.distance = distance;
        calculateField(Number(distance), editDuration, editSpeed);
        setEditDistance(Number(distance));
    }

    const updateDuration = (duration) => {
        initValues.duration = duration;
        calculateField(editDistance, Number(duration), editSpeed);
        setEditDuration(Number(duration));
    }

    const updateMinute = (min) => {
        console.log(min)
        const speed = reduceSpeed(min, editSecond);
        initValues.speed = speed;
        setEditMinute(min);
        calculateField(editDistance, editDuration, speed);
        setEditSpeed(speed);
    }

    const updateSecond = (sec) => {
        console.log(sec)
        if ((sec < 60) || !sec) {
            const speed = reduceSpeed(editMinute, sec);
            initValues.speed = speed;
            setEditSecond(sec);
            calculateField(editDistance, editDuration, speed);
            setEditSpeed(speed);
        } else {

        }
    }

    const findFormErrors = () => {
        const newErrors = {}
        // distance errors
        if (!editDistance || editDistance === '') newErrors.distance = 'cannot be blank!'
        // duration errors
        if (!editDuration || editDuration === '') newErrors.duration = 'cannot be blank!'
        // speed errors
        if (!editSpeed || editSpeed === '') newErrors.speed = 'Cannot be blank!'
        return newErrors
    }

    return (
        <div>
            <Form onSubmit={(e) => (
                e.preventDefault()
            )}>
                <Form.Group className="mb-3" controlId="formDistance">
                    <Form.Label>Distance (km)</Form.Label>
                    <Form.Control type="number" placeholder="Enter distance" readOnly={distanceReadOnly} value={initValues.distance} onChange={(e) => updateDistance(e.target.value)} isInvalid={!!errors.distance} />
                    <Form.Control.Feedback type="invalid">
                        {errors.distance}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Training duration (min)</Form.Label>
                    <Form.Control type="number" placeholder="Enter duration" readOnly={durationReadOnly} value={initValues.duration} onChange={(e) => updateDuration(e.target.value)} isInvalid={!!errors.duration} />
                    <Form.Control.Feedback type="invalid">
                        {errors.duration}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSpeed">
                    <Form.Label>Run speed (min/km)</Form.Label>
                    <Row>
                        <Col><Form.Control type="number" placeholder="min" readOnly={speedReadOnly} value={initValues.speed ? ('0'+expandSpeed(initValues.speed)[0]).slice(-2): null} isInvalid={!!errors.speed} onChange={(e) => updateMinute(parseInt(e.target.value))} />
                            <Form.Control.Feedback type="invalid">
                                {errors.speed}
                            </Form.Control.Feedback></Col>
                        <Col><Form.Control type="number" placeholder="sec" readOnly={speedReadOnly} value={initValues.speed ? ('0'+expandSpeed(initValues.speed)[1]).slice(-2) : null} isInvalid={!!errors.speed} onChange={(e) => updateSecond(parseInt(e.target.value))} /></Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => addRun()}>
                    Submit
                </Button>
            </Form>
        </div >
    )
}

export default AddForm