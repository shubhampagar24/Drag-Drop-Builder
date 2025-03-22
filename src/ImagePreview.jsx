import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ImagePreview.css"; // Optional for styling

const ImagePreview = () => {
  const { imageUrl } = useParams();
  const navigate = useNavigate();

  return (
    <div className="image-preview-container" onClick={() => navigate("/")}>
      <img src={decodeURIComponent(imageUrl)} alt="Fullscreen Preview" className="fullscreen-image" />
    </div>
  );
};

export default ImagePreview;
