const Filter = ({ handleFilterChange }) => {
  return (
    <>
      Filter : <input onChange={handleFilterChange} />
    </>
  );
};

export default Filter;