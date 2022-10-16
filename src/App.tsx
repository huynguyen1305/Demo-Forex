import React from "react";
import "./App.less";
import TableApp from "./components/TableApp";

function App() {
  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>Forex App</h2>
      <div>
        <TableApp />
      </div>
    </div>
  );
}

export default App;
