import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

// Constants for generating password characters.
const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SPECIAL_CHARS = `~!@#$%^&*()-_=+[]{}|;:'",.<>?/\\`;

function App() {
  // useState — React hook for reactive state.
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // copied status for UI feedback

  // useRef - gives direct access to a DOM element without re-rendering.
  // Useful for actions like copying input value or focusing.
  const passwordRef = useRef(null); // reference to password input field.

  const generatePassword = useCallback(() => {
    // useCallback - memoizes a function so that it doesn’t recreate on every render.
    // Dependencies array: function will recreate only if dependencies change.
    // Here useCallback memoizes the generatePassword function
    // This avoids recreating the function unless length/numAllowed/charAllowed changes!
    let pass = "";
    let str = BASE_CHARS;

    // Add numbers and special characters conditionally.
    if (numAllowed) str += NUMBER_CHARS;
    if (charAllowed) str += SPECIAL_CHARS;

    // Loop through length and randomly pick characters.
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
    setCopied(false); // reset copy status when a new password is generated.
  }, [length, numAllowed, charAllowed]);


  useEffect(() => {
    // useEffect - handles side effects in functional components.
    // Runs after render and can watch dependencies.
    // Here, we regenerate password automatically when options change.
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);


  const copyToClipboard = useCallback(() => {
    // useCallback — memoizes the copyToClipboard function.
    // Prevents unnecessary re-creation of this function on every render.

    // Copy password to clipboard and show temporary feedback.
    if (passwordRef.current) {
      navigator.clipboard.writeText(passwordRef.current.value);
      // Display "Copied!" message.
      setCopied(true);

      // Hide "Copied!" after 2 seconds!
      const timeout = setTimeout(() => setCopied(false), 2000);

      // Optional: clean up timeout if needed (not used here, but good practice)
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      {/* Main container centered vertically and horizontally */}
      <div className="w-full max-w-md bg-gray-800 text-orange-500 rounded-xl shadow-lg p-6 space-y-6">

        {/* Title of the app */}
        <h1 className="text-3xl font-bold text-center text-white">
          Password Generator
        </h1>

        <div className="flex items-center gap-2">

          {/* Password display input */}
          <input
            ref={passwordRef} // ref used for copying.
            type="text"
            readOnly
            value={password} // Controlled input.
            className="flex-1 px-4 py-2 rounded-lg bg-white text-black font-semibold"
          />

          {/* Copy button with dynamic label */}
          <button
            onClick={copyToClipboard}
            className="text-sm px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
          >
            {copied ? "Copied!" : "Copy"} {/* Show feedback when copied */}
          </button>

        </div>

        <div className="space-y-4">
          {/* Password length slider */}
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Length: {length}</label>
            <input
              type="range"
              min={4}
              max={30}
              value={length} // Controlled slider.
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2"
            />
          </div>

          {/* Include numbers toggle */}
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Include Numbers</label>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className="h-5 w-5"
            />
          </div>

          {/* Include special characters toggle */}
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="h-5 w-5"
            />
          </div>

          {/* Generate password button */}
          <button
            onClick={generatePassword}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

/*
  NOTES: React Handlers and 'useCallback vs Inline Functions'

  1️⃣ useCallback (memoized functions)
    - Example: copyToClipboard, generatePassword
    - Why use it:
        • React creates new functions every render by default.
        • If function has heavy logic (like generating password, copying to clipboard)
          or is passed to child components, it can cause unnecessary re-renders.
        • useCallback "remembers" the function, recreates it only if dependencies change.

  2️⃣ Inline arrow functions
    - Example:
        • onChange={(e) => setLength(Number(e.target.value))}
        • onChange={() => setNumAllowed(prev => !prev)}
        • onChange={() => setCharAllowed(prev => !prev)}
    - Why use it:
        • Logic is very simple → just updating state
        • Performance impact is negligible
        • Cleaner to write directly in JSX

  3️⃣ Rules of Thumb
    • If function is complex, does side-effects, or is passed to children → use useCallback
    • If function is simple, just updates state → inline arrow is fine

  4️⃣ Controlled vs Ref usage
    • Controlled input: value comes from React state and updates via onChange
    • Ref: gives direct access to DOM, used for copying, focusing, or other DOM actions
*/
