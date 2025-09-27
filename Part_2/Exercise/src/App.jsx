import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const Note = ({ note, toggleImportance }) => {
    const label = note.important ? "Not Important" : "Important";
    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    );
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
    });
  };
  return (
    <div>
      <h1>These are the names and numbers list fetched with effect hook</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
