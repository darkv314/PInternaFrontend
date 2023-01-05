import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Link to="/jefe/materias">Jefe materias</Link>
            <br />
            <Link to="/jefe/estudiantes">Jefe estudiantes</Link>
            <br />
            <Link to="/admin/gestiones">Admin gestiones</Link>
            <br />
            <Link to="/admin/usuarios">Admin usuarios</Link>
            <br />
            <Link to="/estudiante/materias">Estudiante materias</Link>
        </div>
    );
}

export default Home;
