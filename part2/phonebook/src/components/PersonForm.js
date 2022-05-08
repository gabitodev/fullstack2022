const PersonForm = ({ handleNameChange, handleNumberChange, handleSubmit  }) => {
  return (
  <form>
    <div>
      name: <input onChange={handleNameChange} />
      number: <input onChange={handleNumberChange} />
    </div>
    <div>
      <button onClick={handleSubmit} type="submit">add</button>
    </div>
  </form>
  );
};

export default PersonForm;