import useAuth from "../../../hooks/useAuth";
import {
    FaBook,
    FaUsers,
    FaBookReader,
    FaRegCalendarCheck,
    FaSignOutAlt,
} from "react-icons/fa";

import "./nav.css";
import NavButton from "../../../components/NavButton/NavButton";

function Nav() {
    const { auth } = useAuth();
    return (
        <nav>
            {auth?.roles?.find((role) => role === "jefe") ? (
                <>
                    <NavButton path="/jefe/materias" icon={<FaBook />} />
                    <NavButton
                        path="/jefe/estudiantes"
                        icon={<FaBookReader />}
                    />
                </>
            ) : auth?.roles?.find((role) => role === "admin") ? (
                <>
                    <NavButton path="/admin/usuarios" icon={<FaUsers />} />
                    <NavButton
                        path="/admin/gestiones"
                        icon={<FaRegCalendarCheck />}
                    />
                </>
            ) : null}
            <NavButton path="/login" icon={<FaSignOutAlt />} tooltip="Logout" />
        </nav>
    );
}

export default Nav;
