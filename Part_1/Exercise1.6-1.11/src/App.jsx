import React from "react";
import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isvisible, setIsvisible] = useState(false);

  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positive = total > 0 ? (good / total) * 100 : 0;

  const handleGoodClick = () => {
    setIsvisible(true);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setIsvisible(true);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setIsvisible(true);
    setBad(bad + 1);
  };

  const Statistics = () => {
    if (!isvisible) {
      return <p>No feedback given</p>;
    }
    const Good = () => {
      return (
        <tr>
          <td>Good:</td>
          <td>{good}</td>
        </tr>
      );
    };

    const Neutral = () => {
      return (
        <tr>
          <td>Neutral:</td>
          <td>{neutral}</td>
        </tr>
      );
    };

    const Bad = () => {
      return (
        <tr>
          <td>Bad:</td>
          <td>{bad}</td>
        </tr>
      );
    };

    const Total = () => {
      return (
        <tr>
          <td>Total:</td>
          <td>{total}</td>
        </tr>
      );
    };

    const Average = () => {
      return (
        <tr>
          <td>Average:</td>
          <td>{average === 0 ? 0 : average.toFixed(2)}</td>
        </tr>
      );
    };

    const Positive = () => {
      return (
        <tr>
          <td>Positive:</td>
          <td>{positive === 0 ? "0%" : `${positive.toFixed(1)}%`}</td>
        </tr>
      );
    };

    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Good />
            <Neutral />
            <Bad />
            <Total />
            <Average />
            <Positive />
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div>
      <h1>Give Feedback!</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Statistics />
    </div>
  );
}

export default App;
