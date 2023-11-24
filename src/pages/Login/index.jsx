import { redirect, useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
 
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    await fetch("/users.json")
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard");
        } else {
          setMessage("Login falhou. Verifique suas credenciais.");
        }
      });
  };

  return (
    <div className="login-container">
      <img src="/images/logo.png" style={{ width: 50 }} />
      <h2 className="login-title">Login</h2>
      <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className="login-button" onClick={handleLogin}>Entrar</button>
      <p>{message}</p>
      </div>
  )
 
  };

export default Login;
