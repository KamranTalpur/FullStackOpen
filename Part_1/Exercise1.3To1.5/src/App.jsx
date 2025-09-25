function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  function Header() {
    return <h1>{course.name}</h1>;
  }
  function Content() {
    return (
      <div>
        <p>
          The first part teaches {course.parts[0].name} which has{" "}
          {course.parts[0].exercises} exercises.
        </p>
        <p>
          The second part teaches {course.parts[1].name} which has{" "}
          {course.parts[1].exercises} exercises.
        </p>
        <p>
          The third part teaches {course.parts[2].name} which has{" "}
          {course.parts[2].exercises} exercises.
        </p>
      </div>
    );
  }

  function Total() {
    return (
      <p>
        The total number of exercises is{" "}
        {course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises}
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
