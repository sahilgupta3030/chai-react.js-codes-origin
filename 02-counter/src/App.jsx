import "./App.css";

function App() {
  // This is just a normal JS variable, not React state.
  let counter = 10;

  const addValue = () => {
    // Updating a normal variable changes it in memory.
    counter = counter + 1;

    // Console shows the new value because JS sees the update.
    console.log("Add clicked", Math.random());
    console.log("New value", counter);

    // BUT React does NOT know that 'counter' changed
    // So the UI (the <h2>) will NOT re-render...
    // React only re-renders when state or props change.
  };

  return (
    <>
      <h1>Chai aur react</h1>
      {/*
        This displays the value of 'counter' at the time of render
        React does not track plain variables, so it stays 10
      */}
      <h2>Counter value: {counter} </h2>
      <button onClick={addValue}>Add value</button>
      &nbsp;
      <button>Reduce value</button>
    </>
  );
}

export default App;
