import { createContext, useState, useEffect } from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('calendar')) || []);
    const [summary, setSummary] = useState({})

    const getKeys = () => {
        let i = 1
        const keyNames = []
        while (i) {
            const keyName = localStorage.key(i - 1);
            if (keyName) {
                if (keyName !== "calendar") {
                    keyNames.push(keyName)
                }
                i++
            } else {
                i = null
            }
        }
        return keyNames;
    }

    const updateSummary = () => {
        const keyNames = getKeys();
        
        let completedRuns = 0;
        let uncompletedRuns = 0;
        let completedDistance = 0;
        let uncompletedDistance = 0;

        for (const key of keyNames) {
            const entry = JSON.parse(localStorage.getItem(key));
            if (entry.completed) {
                completedRuns++;
                completedDistance += Number(entry.distance);
            } else {
                uncompletedRuns++
                uncompletedDistance += Number(entry.distance);
            }
        }
        setSummary({
            completedRuns: completedRuns,
            unCompletedRuns: uncompletedRuns,
            completedDistance: completedDistance,
            uncompletedDistance: uncompletedDistance
        });
    }

    useEffect(() => {
        if (data) {
            localStorage.setItem("calendar", JSON.stringify(data));
        }
    }, [data])

    useEffect(() => {
        updateSummary()
    },[])
    
    return (
        <DataContext.Provider value={({
            data, setData,
            summary, updateSummary
        })}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;