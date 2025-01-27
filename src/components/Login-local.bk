import React from "react";

const Login = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Welcome</h1>
        <p>Please log in using one of the following:</p>
        <a href="http://localhost:5000/auth/google" style={{ ...styles.button, ...styles.google }}>
          Login with Google
        </a>
        <a href="http://localhost:5000/auth/linkedin" style={{ ...styles.button, ...styles.linkedin }}>
          Login with LinkedIn
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  box: {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  button: {
    textDecoration: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    margin: "10px",
    display: "inline-block",
  },
  google: {
    backgroundColor: "#db4437",
  },
  linkedin: {
    backgroundColor: "#0077b5",
  },
};

export default Login; // exports the Login component