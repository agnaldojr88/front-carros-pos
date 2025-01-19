import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componentes de Autenticação
import { AuthProvider } from "./components/Auth/AuthContext";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Componentes de Layout e Páginas
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import CarList from "./components/CarList/CarList";
import UserProfile from "./components/UserProfile/UserProfile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas com autenticação */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CarList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
