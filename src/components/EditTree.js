import React, { useState } from "react";
import "./EditTree.css";

function EditTree({ tree, setTrees, setCurrentTree }) {
  const [name, setName] = useState(tree.name);
  const [description, setDescription] = useState(tree.description);
  const [img, setImg] = useState(tree.img);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường không hợp lệ
    if (!name || !description || !img) {
      setErrorMessage("All fields are required.");
      return;
    }

    const updatedTree = { ...tree, name, description, img };
    console.log("Updating tree with data:", updatedTree); // Log dữ liệu cập nhật

    fetch(`http://localhost:5000/trees/${tree.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTree),
    })
      .then((response) => {
        console.log("Response:", response); // Log phản hồi từ server
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data after update:", data); // Log dữ liệu đã cập nhật
        setTrees((prevTrees) =>
          prevTrees.map((t) => (t.id === data.id ? data : t))
        );
        setCurrentTree(null);
        setSuccessMessage("Tree updated successfully!");
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error("Error updating tree:", error);
        setErrorMessage("Failed to update tree. Please try again.");
        setSuccessMessage(null);
      });
  };

  return (
    <div className="edit-tree-container">
      <h2>Edit Tree</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tree Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL"
          required
        />
        <button type="submit">Update Tree</button>
        <button type="button" onClick={() => setCurrentTree(null)}>
          Cancel
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
}

export default EditTree;
