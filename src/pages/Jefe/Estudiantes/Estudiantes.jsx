import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../api/FetchData";
import Tabla from "../../../components/Tabla/Tabla";
import useAuth from "../../../hooks/useAuth";
import useStudent from "../../../hooks/useStudent";
import "./estudiantes.css";

function Estudiantes() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { setStudent } = useStudent();
    const [career, setCareer] = useState("");
    const [students, setStudents] = useState([]);
    const tablaConfig = [
        {
            main: "Estudiantes",
            columns: [
                {
                    name: "Nombre",
                    cell: "userName",
                },
                {
                    name: "Código",
                    cell: "usercode",
                },
            ],
        },
        {
            main: "Acciones",
            columns: ["Editar Materias"],
        },
    ];

    useEffect(() => {
        async function getStudents() {
            await fetchData(
                `career/head/${auth.user}`,
                setCareer,
                auth?.accessToken
            );
        }
        getStudents();
    }, []);

    useEffect(() => {
        // console.log(career);
        fetchData(
            `user-career/career/${career.id}`,
            setStudents,
            auth?.accessToken
        );
    }, [career]);

    function handleEdit(e) {
        let item =
            e.target.parentElement.parentElement.getElementsByTagName("td")[1]
                .innerHTML;
        let name =
            e.target.parentElement.parentElement.getElementsByTagName("td")[0]
                .innerText;
        // console.log(item);
        setStudent({ code: item, name: name });
        navigate("/estudiante/materias");
    }

    return (
        <div className="jefeEstudiantes">
            <div className="top-side">
                <h1>Estudiantes</h1>
                <p>{career.name}</p>
            </div>

            {/* <p>{JSON.stringify(students)}</p> */}
            <Tabla
                data={students}
                config={tablaConfig}
                handleEdit={handleEdit}
            />
        </div>
    );
}

export default Estudiantes;
