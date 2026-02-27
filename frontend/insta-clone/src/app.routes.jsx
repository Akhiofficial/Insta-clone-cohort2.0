import { createBrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Welcome to the App</h1>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])

