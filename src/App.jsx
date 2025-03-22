import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ImagePreview from "./ImagePreview";
import "./App.css";

const initialElements = [
  { id: "text", type: "Text", content: "Sample Text" },
  { id: "image", type: "Image", content: "" },
  { id: "button", type: "Button", content: "Click Me" },
];

const Builder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedElements = localStorage.getItem("savedElements");
    if (savedElements) {
      setElements(JSON.parse(savedElements));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("savedElements", JSON.stringify(elements));
    alert("Layout saved!");
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === "elements" && destination.droppableId === "canvas") {
      const draggedItem = initialElements.find((el) => el.id === draggableId);
      if (draggedItem) {
        setElements((prev) => [...prev, { ...draggedItem, id: `${draggedItem.id}-${prev.length}` }]);
      }
      return;
    }

    if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
      const reorderedElements = Array.from(elements);
      const [movedItem] = reorderedElements.splice(source.index, 1);
      reorderedElements.splice(destination.index, 0, movedItem);
      setElements(reorderedElements);
    }
  };

  const handleInputChange = (e) => {
    if (!selectedElement) return;
    setElements((prev) =>
      prev.map((el) => (el.id === selectedElement.id ? { ...el, content: e.target.value } : el))
    );
    setSelectedElement((prev) => (prev ? { ...prev, content: e.target.value } : null));
  };

  const handleImageUpload = (e) => {
    if (!selectedElement || selectedElement.type !== "Image") return;
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setElements((prev) =>
        prev.map((el) => (el.id === selectedElement.id ? { ...el, content: imageUrl } : el))
      );
      setSelectedElement((prev) => (prev ? { ...prev, content: imageUrl } : null));
    }
  };

  const handleDelete = () => {
    if (!selectedElement) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedElement.id));
    setSelectedElement(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="navbar">
        <div className="logo">
          <img className="header-icon" src="dragDropImg.jpg" alt="" />
        </div>
        <div className="title">
          <h1 className="builder-header">Drag Drop Builder</h1>
        </div>
      </div>
      <div className="builder-container">
        <aside className="sidebar">
          <h3>Elements</h3>
          <Droppable droppableId="elements" isDropDisabled={true}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="draggable-list">
                {initialElements.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="draggable-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.type}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </aside>

        <main className="canvas">
          <h3>Canvas</h3>
          <Droppable droppableId="canvas">
            {(provided) => (
              <div className="canvas-area" ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided) => (
                      <div
                        className={`canvas-element ${selectedElement?.id === el.id ? "selected" : ""}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setSelectedElement(el)}
                      >
                        {el.type === "Text" && <p>{el.content}</p>}
                        {el.type === "Image" && el.content && (
                          <img
                            src={el.content}
                            alt="Uploaded"
                            className="uploaded-image"
                            onClick={() => navigate(`/preview/${encodeURIComponent(el.content)}`)}
                          />
                        )}
                        {el.type === "Button" && <button>{el.content}</button>}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </main>

        <aside className="property-panel">
          <h3>Properties</h3>
          {selectedElement && (
            <>
              {selectedElement.type === "Image" ? (
                <>
                  <label className="up">Upload Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </>
              ) : (
                <input
                  type="text"
                  value={selectedElement.content}
                  onChange={handleInputChange}
                  placeholder={selectedElement.type === "Text" ? "Edit Text" : "Edit Button Label"}
                />
              )}
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </>
          )}
          <button onClick={handleSave} className="save-btn">Save Layout</button>
        </aside>
      </div>
    </DragDropContext>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/preview/:imageUrl" element={<ImagePreview />} />
      </Routes>
    </Router>
  );
};

export default App;
