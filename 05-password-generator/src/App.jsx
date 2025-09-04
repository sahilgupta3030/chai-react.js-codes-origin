import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SPECIAL_CHARS = `~!@#$%^&*()-_=+[]{}|;:'",.<>?/\\`;

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // copied status for UI feedback

  // useRef — gives direct access to the input field holding the password (used for copying)
  const passwordRef = useRef(null);

  // useCallback — memoizes the generatePassword function
  // This avoids recreating the function unless length/numAllowed/charAllowed change
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = BASE_CHARS;

    if (numAllowed) str += NUMBER_CHARS;
    if (charAllowed) str += SPECIAL_CHARS;

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
    setCopied(false); // reset copy status when a new password is generated
  }, [length, numAllowed, charAllowed]);

  // useEffect — automatically runs generatePassword() whenever
  // length, numAllowed, or charAllowed change
  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed, generatePassword]);

  // useCallback — memoizes the copyToClipboard function
  // Prevents unnecessary re-creation of this function on every render
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      navigator.clipboard.writeText(passwordRef.current.value);
      setCopied(true);

      // Show "Copied!" for 2 seconds, then hide it
      const timeout = setTimeout(() => setCopied(false), 2000);

      // Optional: clean up timeout if needed (not used here, but good practice)
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 text-orange-500 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">
          Password Generator
        </h1>

        <div className="flex items-center gap-2">
          <input
            ref={passwordRef}
            type="text"
            readOnly
            value={password}
            className="flex-1 px-4 py-2 rounded-lg bg-white text-black font-semibold"
          />
          <button
            onClick={copyToClipboard}
            className="text-sm px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Length: {length}</label>
            <input
              type="range"
              min={4}
              max={30}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Include Numbers</label>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className="h-5 w-5"
            />
          </div>

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
