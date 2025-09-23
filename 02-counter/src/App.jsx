import "./App.css";

function App() {
  // This is a normal JavaScript variable, NOT React state.
  // Changing it will not trigger a UI update automatically.
  let counter = 10;

  const addValue = () => {
    // Increment the counter variable in memory.
    counter = counter + 1;

    // Log the new value to the console.
    // JS sees this update, so console will show it.
    console.log("Add clicked", Math.random());
    console.log("New value", counter);

    // React does NOT detect changes to plain variables.
    // So the UI (<h2>) will NOT re-render here.
    // React only re-renders when state or props change!
  };

  return (
    <>
      <h1>Chai aur react</h1>
      {/*
        Displays the current value of 'counter' as of initial render.
        Since 'counter' is not state, it will NOT update when changed.
      */}
      <h2>Counter value: {counter} </h2>

      {/*
        Clicking this button calls addValue, which updates the variable in memory,
        but the UI will stay the same because 'counter' is not state.
      */}
      <button onClick={addValue}>Add value</button>
      &nbsp;
      <button>Reduce value</button>
    </>
  );
}

export default App;
