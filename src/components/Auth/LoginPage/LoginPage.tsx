import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuth } from "../AuthContext";

// Componente reutilizável para campos de entrada
interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, name }) => (
  <div className="input-field">
    <label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="input"
        required
      />
    </label>
  </div>
);

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Atualiza o estado do formulário dinamicamente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manipula o login
  const handleLogin = async () => {
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1>Bem-vindo!</h1>
        {error && <p className="error-message">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <InputField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <div className="footer">
          <h5>Trabalho de Pós - Agnaldo Junior</h5>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
