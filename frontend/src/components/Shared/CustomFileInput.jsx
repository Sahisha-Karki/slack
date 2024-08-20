import React from "react";

const customFileUploadStyle = {
  position: "relative",
  display: "flex",
  marginBottom: "10px",
};

const uploadButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 18px",
  fontSize: "16px",
  color: "#000",
  backgroundColor: "#ffffff",
  border: "1px solid #616161",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const uploadIconStyle = {
  marginRight: "8px",
  color: "#bbb",
  height: "18px",
  width: "18px",
};

const fileInputStyle = {
  position: "absolute",
  left: "-9999px",
};

const CustomFileInput = ({ onFileChange, index }) => {
  return (
    <div style={customFileUploadStyle}>
      <label htmlFor={`file-upload-${index}`} style={uploadButtonStyle}>
        <img
          src="./images/fileupload.png"
          alt="fileupload"
          style={uploadIconStyle}
        />
        Choose file
      </label>
      <input
        id={`file-upload-${index}`}
        type="file"
        onChange={(event) => onFileChange(event.target.files[0])}
        style={fileInputStyle}
        accept="image/*"
      />
    </div>
  );
};

export default CustomFileInput;
