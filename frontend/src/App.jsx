import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router";
import { userAuthStore } from "./store/userAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Toast from "./components/Toast";
 
function App() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) {
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
    
  return (
    <div>
      <Navbar/>

      <Toast/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App;
