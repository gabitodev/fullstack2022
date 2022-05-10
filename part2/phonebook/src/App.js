import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/Server';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personExist = persons.find(person => person.name === newName);
    if (personExist) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const updatedPerson = {...personExist, number: newNumber};
        personService
          .update(personExist.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personExist.id ? person : returnedPerson));
            setNotification({
              message: `Number changed for ${newName}`,
              isSuccessful: true
            });
            setTimeout(() => setNotification(null), 5000);
            setNewName('');
            setNewNumber('');
            setSearch('');
          })
          .catch(() => {
            setNotification({
              message: `Person ${newName} was already removed from the server`,
              isSuccessful: false
            });
            setTimeout(() => setNotification(null), 5000);
            setPersons(persons.filter(person => person.id !== personExist.id));
          })
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      };

      personService
      .create(newPersonObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNotification({
          message: `Added ${newName}`,
          isSuccessful : true
        });
        setTimeout(() => setNotification(null), 5000);
        setNewName('');
        setNewNumber('');
        setSearch('');
      });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)));
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
      <Notification notification={notification}/>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleNameChange={handleNameChange} inputNameValue={newName} handleNumberChange={handleNumberChange} inputNumberValue={newNumber} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App;