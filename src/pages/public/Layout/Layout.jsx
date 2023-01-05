import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Nav from "../Nav/Nav";
import { useLocation } from "react-router-dom";
import "./layout.css";

function Layout() {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        <main className="App">
            {location.pathname === "/login" ? (
                <Outlet />
            ) : (
                <div className="layout">
                    <Nav />
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            )}
        </main>
    );
}

export default Layout;
