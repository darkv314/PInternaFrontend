import useAuth from "../../../hooks/useAuth";
import {
    FaBook,
    FaUsers,
    FaBookReader,
    FaRegCalendarCheck,
    FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./nav.css";
import NavButton from "../../../components/NavButton/NavButton";

function Nav() {
    const { auth } = useAuth();
    const animation = {
        hidden: { x: -10, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { opacity: 0 },
    };
    return (
        <AnimatePresence initial={false} mode={"wait"}>
            <motion.nav
                variants={animation}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
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
                <NavButton
                    path="/login"
                    icon={<FaSignOutAlt />}
                    tooltip="Logout"
                />
            </motion.nav>
        </AnimatePresence>
    );
}

export default Nav;
