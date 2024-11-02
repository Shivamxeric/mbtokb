import React, { useState } from "react";
import { Client, Account } from "appwrite";

// Initialize Appwrite client using environment variables
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Project ID

const appwriteAccount = new Account(client);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Signup Function
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await appwriteAccount.create(
        "unique()",
        email,
        password
      );
      setMessage(`User registered: ${response.email}`);
    } catch (error) {
      setMessage(`Signup Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1>Login / Signup</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
