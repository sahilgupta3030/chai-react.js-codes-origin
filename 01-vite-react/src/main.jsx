import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const anotherElement = (
  <h2>
    <a href="https://www.google.com/">GoogleApp</a>{" "}
  </h2>
);

const ReactElement = React.createElement(
  "a",
  {
    href: "https://www.google.com/",
    style: { textDecoration: "none" },
  },
  "Google Link"
);

createRoot(document.getElementById("root")).render(
  // <App />,
  // anotherElement,
  ReactElement,
);
