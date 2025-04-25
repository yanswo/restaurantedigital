import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.token && response.data.user.role === "ADMIN") {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert("Usuário não é administrador.");
      }
    } catch (err) {
      alert("Login inválido.");
    }
  }

  return (
    <div className="login-container">
      <h1>Login Admin</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
