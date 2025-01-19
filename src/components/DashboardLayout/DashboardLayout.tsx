import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.css";
import Header from "../Header/Header";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Lista de Carros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Perfil
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
