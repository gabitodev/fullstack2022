import { useState } from 'react'
import Filter from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const personExist = persons.some(person => person.name === newName);
    if (personExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPersonObject));
      setNewName('');
      setNewNumber('');
      setSearch('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = !search ? persons : persons.filter((person) => person.name.toLowerCase().startsWith(search.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} search={search} />
      <h3>Add a new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;