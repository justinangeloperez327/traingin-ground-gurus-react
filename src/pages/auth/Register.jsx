import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    register({
      email,
      name,
      password,
      confirmPassword,
    });
  };
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>

          <label className="label">Name</label>
          <input
            type="tet"
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
