import Card from "./components/Card";
// Importing Card component from folder.
// Components let us reuse UI with different data.

function App() {
  return (
    // JSX looks like HTML but it calls a React function !
    // Props are passed as parameters through this HTML-like syntax !

    <>
      {/* Using Card component with props (custom data) */}
      <Card username="sahilgupta" role="softwareengineer" />

      {/* Another Card with different props */}
      <Card username="abhishekthakre" role="dataprocessor" />

      {/* Card without props → default values will be used */}
      <Card />
    </>
  );
}

export default App;
