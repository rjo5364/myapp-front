import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // For handling 401 or other errors

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          // res.ok = true for 200-299
          return res.json();
        } else if (res.status === 401) {
          // Unauthorized
          throw new Error("Unauthorized");
        } else {
          // Some other error
          throw new Error("Server Error");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          setError("User not logged in");
        } else {
          setError("An error occurred while fetching the profile.");
          console.error(err);
        }
      });
  }, []);

  // If we have an error, display the error state (e.g. "User not logged in")
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h1>{error}</h1>
          <a href="/" style={styles.button}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // If we're still waiting for user data and there's no error yet
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  // Otherwise, display the logged-in user's info
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Welcome, {user.name}!</h1>
        {user.profilePicture && (
          <img src={user.profilePicture} alt="Profile" style={styles.image} />
        )}
        <p>Email: {user.email}</p>
        <button
          style={styles.button}
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:5000/logout", {
                method: "GET",
                credentials: "include",
              });
              // If logout succeeds, redirect to login page
              if (response.ok) {
                window.location.href = "/";
              } else {
                console.error("Logout failed:", response.status);
              }
            } catch (err) {
              console.error("Fetch error:", err);
            }
          }}
        >
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
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    borderRadius: "50%",
    margin: "10px 0",
    width: "100px",
    height: "100px",
  },
  button: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#0077b5",
    padding: "10px 20px",
    borderRadius: "4px",
    marginTop: "10px",
    display: "inline-block",
  },
};

export default Profile;