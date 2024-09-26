import React, { useState, useEffect } from "react";
import TreeList from "./components/TreeList";
import TreeForm from "./components/TreeForm";
import "./App.css";

function App() {
  const [trees, setTrees] = useState([]);
  const [currentTree, setCurrentTree] = useState(null); // Thêm state cho currentTree

  // Fetch trees from backend
  useEffect(() => {
    fetch("http://localhost:5000/trees")
      .then((response) => response.json())
      .then((data) => setTrees(data))
      .catch((error) => console.error("Error fetching trees:", error));
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="header-title">Flower Shop</h1>
        <h2 className="header-title-1">About me</h2>
      </div>
      <TreeForm setTrees={setTrees} />
      <TreeList
        trees={trees}
        setTrees={setTrees}
        setCurrentTree={setCurrentTree}
        currentTree={currentTree}
      />
    </div>
  );
}

export default App;
