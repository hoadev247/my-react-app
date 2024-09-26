import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTree from "./EditTree";
import "./TreeList.css";

function TreeList({ trees, setTrees, setCurrentTree, currentTree }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/trees/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTrees(trees.filter((tree) => tree.id !== id));
      })
      .catch((error) => console.error("Error deleting tree:", error));
  };

  const handleEdit = (tree) => {
    setCurrentTree(tree);
  };

  return (
    <div id="tree-list-container">
      <h2 id="tree-list-title">List of Ornamental Plants</h2>
      <ul id="tree-list">
        {trees.map((tree) => (
          <li key={tree.id} id={`tree-item-${tree.id}`}>
            {currentTree && currentTree.id === tree.id ? (
              <EditTree
                tree={currentTree}
                setTrees={setTrees}
                setCurrentTree={setCurrentTree}
              />
            ) : (
              <>
                <h3 id={`tree-name-${tree.id}`}>{tree.name}</h3>
                <p id={`tree-description-${tree.id}`}>{tree.description}</p>
                <img
                  id={`tree-img-${tree.id}`}
                  src={tree.img}
                  alt={tree.name}
                  width="100"
                />
                <button
                  className="edit-button"
                  onClick={() => handleEdit(tree)}
                >
                  <FaEdit className="icon" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(tree.id)}
                >
                  <FaTrash className="icon" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreeList;
