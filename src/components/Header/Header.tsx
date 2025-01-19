import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  const handleProfile = () => {
    console.log("Redirecionando!");
  };

  return (
    <header className="header">
      <div className="header-title">Projeto Pós - Carros</div>
      <div className="header-menu">
        <button className="menu-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
