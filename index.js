import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";

// ReactDOM.render(<App />, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
await root.render(<App/>);

