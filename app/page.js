"use client"; // 因為我們在前端處理文件上傳，所以需要這行

import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("請選擇影片");

    const formData = new FormData();
    formData.append("video", selectedFile);

    setUploading(true);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("上傳失敗:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h2 style={styles.title}>影片上傳</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleUpload} disabled={uploading} style={styles.button}>
        {uploading ? "上傳中..." : "上傳影片"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    backgroundImage: "url('http://localhost:3000/basketball.jpg')", // Ensure the path is correct
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Ensure the container takes the full height of the viewport
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // 60% transparent white overlay
    borderRadius: "10px",
  },
  title: {
    position: "relative",
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
  },
  input: {
    position: "relative",
    display: "block",
    margin: "0 auto 20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "border-color 0.3s",
  },
  button: {
    position: "relative",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  inputHover: {
    borderColor: "#007BFF",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};