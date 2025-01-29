import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/profile`,
          {
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Please log in to continue"
              : "Failed to fetch profile"
          );
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        if (err.message === "Please log in to continue") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/logout`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Welcome, {user.name}!</h1>
        {user.profilePicture && (
          <img src={user.profilePicture} alt="Profile" style={styles.image} />
        )}
        <p style={styles.email}>Email: {user.email}</p>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
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
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
  },
  image: {
    borderRadius: "50%",
    margin: "1rem 0",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    border: "2px solid #f4f4f9",
  },
  email: {
    color: "#666",
    margin: "1rem 0",
  },
  button: {
    backgroundColor: "#0077b5",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "opacity 0.2s ease",
    "&:hover": {
      opacity: 0.9,
    },
  },
};

export default Profile;