const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
  const total = parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} /> )}
    </>
  );
}

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>

    </>
  );
}

export default Course;