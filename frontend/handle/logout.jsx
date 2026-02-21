import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import api from "../src/api/axios";

export const useLogout = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await api.post("/users/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            // console.error("Logout failed:", err);
        }
        logout();
        navigate("/login");
    };
    
    return handleLogout;
};