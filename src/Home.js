import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import WeekRow from './WeekRow';
import { useContext } from 'react';
import DataContext from './DataContext';

const Home = () => {

  const { data, setData, updateSummary } = useContext(DataContext);
  
  const getWeekNum = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const dayNum = date.getDay();
    date.setDate(date.getDate()+4-dayNum);
    const weekNum = Math.ceil(((date - oneJan) / 86400000 + 1)/ 7);
    return weekNum;
  }

  const addWeek = () => {
    if (data.length) {
      const lastDate = new Date(data[data.length - 1].dates[6].date);
      const lastWeeknum = data[data.length - 1].weekNum;
      const monday = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1);
      const arrayToAdd = [];
      for (let i = 0; i <= 6; i++) {
        const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        arrayToAdd.push({
          date: day,
          run: {}
        });
      }

      const objectToAdd = {
        weekNum: lastWeeknum + 1,
        dates: arrayToAdd,
      }
      setData([...data, objectToAdd]);
    } else {
      const currentDate = new Date();
      const weekNum = getWeekNum(currentDate);
      const monday = new Date(currentDate - (currentDate.getDay() - 1) * 24 * 60 * 60 * 1000);
      const arrayToAdd = [];
      for (let i = 0; i <= 6; i++) {
        const day = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        arrayToAdd.push({
          date: day,
          run: {}
        });
      }

      const objectToAdd = {
        weekNum: weekNum,
        dates: arrayToAdd,
      }
      setData([...data, objectToAdd]);
      localStorage.setItem("calendar", JSON.stringify([...data, objectToAdd]));
    }
  }

  const clearAll = () => {
    setData([])
    localStorage.clear();
    updateSummary();
  }

  return (
    <Container fluid className="p-3">
      {data.map((week) => (
        <WeekRow key={week.weekNum} week={week} currentWeek={getWeekNum(new Date())} />
      ))}
      <Button className="m-2" onClick={addWeek}>Add week</Button>
      {data.length ? <Button className="m-2 btn-warning" onClick={clearAll}> Clear all </Button> : null}
    </Container>
  )
}

export default Home
