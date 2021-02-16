import React, { useState, useEffect } from 'react';
import './App.css';
import store from 'store';
import { v4 as uuidv4 } from 'uuid';
import TDRow from './Components/Row/Row';
import InbTRow from './Components/InputButton/InputButton';
function App() {

  const [data, setData] = useState([]);
  const [inputAdd, setInputAdd] = useState('');

  useEffect(() => {
    let userId = store.get("userId");
    if (!userId) {
      userId = uuidv4();
      store.set("userId", userId);
    }
    else {
      fetch(`https://kvdb.io/${process.env.REACT_APP_DB_API_KEY}/${userId}`)
        .then(response => response.text())
        .then(data => {
          if (data !== "Not Found") {
            const d = JSON.parse(data);
            setData(d);
          }
        })
        .catch(e => {
          console.log(e);
        })
    }
  }, [])

  const handleDelete = (id) => {
    const newData = [];
    data.forEach((r, i) => {
      if (i !== id) newData.push(r);
    });
    setData(newData);
    myPostFetch(newData);
  }

  const myPostFetch = (data) => {
    let userId = store.get("userId");
    fetch(`https://kvdb.io/${process.env.REACT_APP_DB_API_KEY}/${userId}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const newData = [...data, inputAdd];
    setData(newData);
    myPostFetch(newData);
    setInputAdd('');
  }

  return (
    <div className="App">
      <div className="div_header">
        <h1>
          TO DO LIST
        </h1>
      </div>
      <div>
        {data !== [] && data.map((t, i) => <TDRow onClick={handleDelete.bind(this, i)} text={t} key={i} />
        )}
      </div>
      <form onSubmit={handleClick}>
        <InbTRow inputAdd={inputAdd} setInputAdd={setInputAdd} />
      </form>
      <div>

      </div>
    </div>
  );
}

export default App;
