import { useContext } from "react";
import { AuthContext } from "../store/auth.context.jsx";
import { login, register, getMe } from "../services/auth.api.js";


export const useAuth = () => {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;


    const handlelogin = async (username, password) => {
        setLoading(true)
        try {
            const response = await login(username, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    const handleRegister = async (username, email, password, name) => {
        setLoading(true)
        try {
            const response = await register(username, email, password, name);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        setLoading(true)
        try {
            const response = await getMe();
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, handlelogin, handleRegister, handleGetMe };
}