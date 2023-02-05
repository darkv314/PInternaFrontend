import Login from "./pages/public/Login/Login";
import Materias from "./pages/Jefe/Materias/Materias";
import Estudiantes from "./pages/Jefe/Estudiantes/Estudiantes";
import Estudiante from "./pages/Estudiante/Estudiante";
import Gestiones from "./pages/Admin/Gestiones/Gestiones";
import Usuarios from "./pages/Admin/Usuarios/Usuarios";
import Missing from "./pages/public/Missing/Missing";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Layout from "./pages/public/Layout/Layout";
import Unauthorized from "./pages/public/Unauthorized/Unauthorized";
import Home from "./pages/Home/Home";

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route path="/" element={<Layout />}>
                    {/*Public routes*/}
                    <Route path="login" element={<Login />} />
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* Protected Routes */}
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={["jefe", "student", "admin"]}
                            />
                        }
                    >
                        <Route path="/" element={<Home />}></Route>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["jefe"]} />}>
                        <Route path="jefe/materias" element={<Materias />} />
                        <Route
                            path="jefe/estudiantes"
                            element={<Estudiantes />}
                        />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                        <Route path="admin/usuarios" element={<Usuarios />} />
                        <Route path="admin/gestiones" element={<Gestiones />} />
                    </Route>
                    <Route
                        element={
                            <RequireAuth allowedRoles={["jefe", "student"]} />
                        }
                    >
                        <Route
                            path="estudiante/materias"
                            element={<Estudiante />}
                        />
                    </Route>

                    {/* Missing */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
