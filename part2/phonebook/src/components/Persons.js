const SinglePerson = ({ name, number, id, removePerson }) => {
  return (
    <>
      <p>{name} {number}</p><button onClick={() => removePerson(id, name)}>delete</button>
    </>
  );
};


const Persons = ({ persons, removePerson }) => {
  return (
    <>
      {persons.map(person => <SinglePerson key={person.id} name={person.name} number={person.number} id={person.id} removePerson={removePerson} />)}
    </>
  );
};

export default Persons;