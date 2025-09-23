import { useState } from "react";
// useState is a React Hook that allows functional components to have state
// State is used to store dynamic values that change over time and cause re-render when updated.

import "./App.css";

function App() {
  // Functional component in React
  // Functional components are just JS functions that return JSX (HTML-like syntax)

  const [color, setColor] = useState("olive");
  // Declaring a state variable 'color' with initial value 'olive'.
  // 'color' holds the current value
  // 'setColor' is the function used to update 'color'
  // Calling 'setColor' triggers React to re-render the component!

  return (
    <>
      {/* Full screen div whose background color changes based on 'color' state */}
      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      // Inline styling using React's style object
      // The value of backgroundColor is dynamic, depends on state
      ></div>

      {/* Fixed button container at bottom for color selection */}
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">

          {/* Red button */}
          {/* Clicking this updates the window's background color to red */}
          {/* Button itself is styled with red color */}
          <button
            onClick={() => setColor("red")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>

          {/* Green button */}
          <button
            onClick={() => setColor("green")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "green" }}
          >
            Green
          </button>

          {/* Blue button */}
          <button
            onClick={() => setColor("blue")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Blue
          </button>
          {/*
            onClick expects a function reference, not the result of a function call.
            Here, onClick={() => setColor("blue")} passes a callback function to React.
            This ensures that setColor executes only when the user clicks the button.
            If we wrote onClick={setColor("blue")} instead, the function would run immediately
            during render, which is incorrect.
            Using the arrow function guarantees the window background changes only on user interaction.
          */}

        </div>
      </div>
    </>
  );
}

export default App;
