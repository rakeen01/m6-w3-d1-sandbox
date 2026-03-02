import React, { useState } from "react";
import BarChart from "./bar-chart/BarChart";
import SphereApp from "./sphere/SphereApp";
import TreeApp from "./tree/TreeApp";
import "./App.css";

const demoTabs = [
  { id: "bar-chart", label: "Animated Bar Chart" },
  { id: "sphere", label: "Sphere of Spheres" },
  { id: "tree", label: "Collapsible Tree" },
];

function App() {
  const [selectedDemo, setSelectedDemo] = useState("bar-chart");
  const isSphereView = selectedDemo === "sphere";

  return (
    <div className="app">
      <nav className="app-nav">
        {demoTabs.map((demo) => (
          <button
            key={demo.id}
            className={`nav-btn ${selectedDemo === demo.id ? "active" : ""}`}
            onClick={() => setSelectedDemo(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <div className={`demo-container ${isSphereView ? "sphere-mode" : ""}`}>
        {selectedDemo === "bar-chart" && <BarChart />}
        {selectedDemo === "sphere" && <SphereApp />}
        {selectedDemo === "tree" && <TreeApp />}
      </div>
    </div>
  );
}

export default App;
