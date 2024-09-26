import React, { useState } from "react";
import "./TreeForm.css";

function TreeForm({ setTrees }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTree = { name, description, img };

    fetch("http://localhost:5000/trees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTree),
    })
      .then((response) => response.json())
      .then((data) => {
        setTrees((prevTrees) => [...prevTrees, data]);
        setName("");
        setDescription("");
        setImg("");
      })
      .catch((error) => console.error("Error adding tree:", error));
  };

  return (
    <div className="form-container">
      Flower Shop
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tree Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          required
        />
        <button className="submit">Add </button>
        <button className="reset">Reset</button>
      </form>
    </div>
  );
}

export default TreeForm;
