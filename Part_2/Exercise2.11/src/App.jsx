import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setNotes(response.data);
    });
  };
  useEffect(hook, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>These are the names and numbers list fetched with effect hook</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            {note.name}: {note.number}
          </li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder="Type Notes Here..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
