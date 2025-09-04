import "./App.css";

function App() {
  let counter = 10;

  const addValue = () => {
    counter = counter + 1;
    console.log("Add clicked", Math.random());
    console.log("New value", counter);
  };

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter} </h2>
      <button onClick={addValue}>Add value</button>
      &nbsp;
      <button>Reduce value</button>
    </>
  );
}

export default App;
