import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch {
      setError("Incorrect username or password");
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            placeholder="Username"
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            placeholder="Password"
          />
        </label>
        <button>Submit</button>
      </form>
      {error && (
        <p
          style={{
            padding: "10px 20px",
            background: "red",
            displey: "block",
            minWidth: "20%",
            margin: "10px auto",
            borderRadius: "20px",
            fontWeight: "900",
            color: "white",
          }}
        >
          !!! {error} !!!
        </p>
      )}
    </>
  );
}
