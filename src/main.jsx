import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { StudentProvider } from "./context/StudentProvider";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <StudentProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </StudentProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
