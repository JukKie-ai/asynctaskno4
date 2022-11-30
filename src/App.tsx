import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';

function App() {
  const [arr, setArr] = useState<any[]>([])
  const [lowPrio, setLowPrio] = useState<any[]>([])
  const [highPrio, setHighPrio] = useState<any[]>([])

  const onPush = () => {
    const tempArr = [...arr]
    let arrValue = Math.floor(Math.random() * 200);
    tempArr.push(arrValue)
    setArr(tempArr)
  }

  const onPop = () => {
    const tempArr = [...arr]
    const popped = tempArr.splice(0, 1);
    setArr(tempArr)

    if(Number(popped) < 100) {
      const tempPrio = [...lowPrio]
      tempPrio.push(popped)
      setLowPrio(tempPrio)
    } else {
      const tempHigh = [...highPrio]
      tempHigh.push(popped)
      setHighPrio(tempHigh)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const tempArr = [...lowPrio]
      tempArr.shift();
      setLowPrio(tempArr)

      const tempArr2 = [...highPrio]
      tempArr2.shift();
      setHighPrio(tempArr2)
    }, 3000);

    return () => clearInterval(interval);
  }, [lowPrio, highPrio]);

  return (
    <div className="App">
      <button onClick={onPush} className="button-19">Add Random Task</button>
      <br />
      <button onClick={onPop} className="button-19">Admit Task</button>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <h2>TASK QUEUE</h2>
          {arr.map((item)=> {
            return <p style={ item > 100 ? {color: 'red'} : {}} >{item}</p>
          })}
      <br />
        </Grid>
        <Grid item xs={4}>
          <h2>High Priority Queue</h2>
          {highPrio.map((item)=> {
            return <p style={ item > 100 ? {color: 'red'} : {}} >{item}</p>
          })}
        </Grid>
        <Grid item xs={4}>
          <h2>Low Priority Queue</h2>
          {lowPrio.map((item)=> {
            return <p style={ item > 100 ? {color: 'red'} : {}} >{item}</p>
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
