const SinglePerson = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  );
};


const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => <SinglePerson key={person.name} name={person.name} number={person.number} /> )}
    </>
  );
};

export default Persons;