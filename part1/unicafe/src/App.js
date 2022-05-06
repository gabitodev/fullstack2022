import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
};


const StadisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Stadistics = (props) => {
  const [goodCount, neutralCount, badCount] = props.feedback;
  const allCount = goodCount + neutralCount + badCount;

  if (allCount > 0) {
    return (
      <>
        <StadisticsLine text='Good' value={goodCount}/>
        <StadisticsLine text='Neutral' value={neutralCount}/>
        <StadisticsLine text='Bad' value={badCount}/>
        <StadisticsLine text='All' value={allCount}/>
        <StadisticsLine text='Average' value={(goodCount - badCount) / allCount}/>
        <StadisticsLine text='Positive' value={`${(goodCount * 100) / allCount} %`}/>
      </>
    );
  } else {
    return (
      <StadisticsLine text='No Stadistics'/>
    );
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h1>Stadistics</h1>
      <table>
        <tbody>
          <Stadistics feedback={[good, neutral, bad]}/>
        </tbody>
      </table>
    </div>
  )
}

export default App;