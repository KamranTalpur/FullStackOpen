function App() {
  const course = "Half Stack application development";
  function Header() {
    return <h1>{course}</h1>;
  }
  const part1 = "Fundamentals of React";
  const part2 = "Using props to pass data";
  const part3 = "State of a component";
  function Content() {
    return (
      <div>
        <p>
          The first part teaches {part1} which has {exercises1} exercises.
        </p>
        <p>
          The second part teaches {part2} which has {exercises2} exercises.
        </p>
        <p>
          The third part teaches {part3} which has {exercises3} exercises.
        </p>
      </div>
    );
  }
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  function Total() {
    return (
      <p>
        The total number of exercises is {exercises1 + exercises2 + exercises3}{" "}
      </p>
    );
  }

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
}

export default App;
