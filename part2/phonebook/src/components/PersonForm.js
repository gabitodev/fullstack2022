const PersonForm = ({ handleNameChange, inputNameValue, handleNumberChange, inputNumberValue, addPerson  }) => {
  return (
  <form>
    <div>
      name: <input onChange={handleNameChange} value={inputNameValue} />
      number: <input onChange={handleNumberChange} value={inputNumberValue} />
    </div>
    <div>
      <button onClick={addPerson} type="submit">add</button>
    </div>
  </form>
  );
};

export default PersonForm;