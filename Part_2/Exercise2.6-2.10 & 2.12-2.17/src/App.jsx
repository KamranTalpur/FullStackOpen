import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./App.css";

// Filter Component
const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name"
      />
    </div>
  );
};

// PersonForm Component
const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

// Persons Component
const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

// Notification Component
const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }
  return <div className="error">{message}</div>;
};

// Main App Component
const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Update person number function
  const updatePersonNumber = (existingPerson) => {
    const updatedPerson = { ...existingPerson, number: newNumber };

    personService
      .update(existingPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== existingPerson.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");
        setMessage(`${existingPerson.name}'s number has been updated`); // Fixed here
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch(() => {
        setError(
          `Information of ${existingPerson.name} has already been removed from server`
        );
        setTimeout(() => {
          setError("");
        }, 5000);
        setPersons(persons.filter((person) => person.id !== existingPerson.id));
      });
  };

  // Add person function
  const addPerson = (event) => {
    event.preventDefault();

    if (!Array.isArray(persons)) {
      alert("Cannot add contact: Data not loaded properly");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        updatePersonNumber(existingPerson);
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setMessage(`${newName} has been added to phonebook`); // Added success message
      setTimeout(() => {
        setMessage("");
      }, 5000);
    });
  };

  // Delete person function
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`${name} has been deleted from phonebook`); // Added delete message
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((error) => {
          setError(`The person '${name}' was already deleted from the server`);
          setTimeout(() => {
            setError("");
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const filteredPersons = Array.isArray(persons)
    ? persons.filter((person) => person.name.toLowerCase().includes(searchTerm))
    : [];

  return (
    <div>
      <h2>Search Your Contact</h2>
      <Notification message={message} />
      <Notification message={error} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Phonebook</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
