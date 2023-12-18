import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

function Layout(){
    const { user } = useSelector((state) => state.user)
    const location = useLocation()
    // console.log(user)

    return user?.token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
}

function App() {
    const { theme } = useSelector((state) => state.theme)
    // console.log(theme)

    return (
      <main data-theme={theme} className="w-full min-h-[100vh]">
          <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id?" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
      </main>
    );
}

export default App;
