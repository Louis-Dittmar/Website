import {useState, useEffect} from 'react';
import './App.css';
/*
Copyright (c) 2022 by Louis Dittmar
This program is free software: you can redistribute it and/or modify

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function App() {
  const [liste, setListe] = useState([]);
  const [id, setId] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('liste');
    if (data !== null) {
      setListe(JSON.parse(data));
    }
  }, []);

  return (
    <container>
      <header>
        <h1>ToDo List</h1>
        <input type="text" id="userInput" placeholder="Wasser, Eis, Karotten,..."
               onKeyPress={(event) => {
                 if (event.key === 'Enter') {
                   const newListe = [...liste, {
                     name: event.target.value,
                     date: new Date().toLocaleDateString(),
                     id,
                     checked
                   }];
                   localStorage.setItem('liste', JSON.stringify(newListe));
                   setListe(newListe);
                   setId(id + 1);
                   event.target.value = '';
                 }
               }
               }></input>
      </header>
      <hr></hr>
      <Table liste={liste} setListe={setListe} setChecked={setChecked}/>
      <div class="Buttons">
        <button class="Remove-Button" onClick={
          () => {
            const newListe = liste.filter(entry => entry.checked === false);
            setListe(newListe);
            //Remove Checked items form localStorage
            localStorage.removeItem("liste");
            localStorage.setItem("liste", JSON.stringify(newListe));
          }
        }>Delete Checked
        </button>
        <button class="Remove-Button" onClick={
          () => {
            localStorage.removeItem("liste");
            setListe([]);
          }}>Delete All
        </button>
      </div>
    </container>
  );
}

function Table({liste, setListe}) {

  const testfunction = (listEntry) => {
    const entries = liste.filter(entry => entry.id !== listEntry.id);

    if (listEntry.checked === true) {
      setListe(entries);
      console.log(entries);
    } else {
      alert("Bist du dir sicher, dass du diesen Eintrag löschen willst?");
      console.log(entries);
    }
  }
  return (
    <table>
      <tr>
        <th>Aufgabe</th>
        <th>Erstellt Am</th>
        <th>Erledigt</th>
        <th>Löschen</th>
      </tr>
      {liste.map(entry =>
        <tr>
          <td>{entry.name}</td>
          <td>{entry.date}</td>
          <td><input type="checkbox" checked={entry.checked} onChange={
            () => {
              if (entry.checked === false) {
                setListe(liste.map(listEntry => listEntry.id === entry.id ? {...listEntry, checked: true} : listEntry));
                localStorage.setItem("liste", JSON.stringify(liste));

              } else {
                setListe(liste.map(listEntry => listEntry.id === entry.id ? {
                  ...listEntry,
                  checked: false
                } : listEntry));
                localStorage.setItem("liste", JSON.stringify(liste));
              }
            }
          }/></td>
          <td>
            <button onClick={() => testfunction(entry)}>Delete</button>
          </td>
        </tr>
      )}
    </table>
  )
}
export default App;
